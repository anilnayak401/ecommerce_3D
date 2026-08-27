import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MousePointer, Layers } from 'lucide-react';
import { soundEngine } from '../utils/audio';

// Global in-memory image cache for 3D frames across view transitions
const globalFrameCache = {};

export default function WebMScroller({
  productId,
  videoUrl,
  productName,
  scrollProgress = 0,
  frameCount = 240
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  const [mode, setMode] = useState('scroll'); // 'scroll' or 'drag'
  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartFrame, setDragStartFrame] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Pre-load all 240 high-res image frames into memory (with caching)
  useEffect(() => {
    let isMounted = true;
    const frameFolder = `/Assets/frames/${productId}`;

    // Serve immediately from in-memory cache if available
    if (globalFrameCache[productId] && globalFrameCache[productId].length === frameCount) {
      imagesRef.current = globalFrameCache[productId];
      setLoadedCount(frameCount);
      setIsFullyLoaded(true);
      return;
    }

    const images = [];
    imagesRef.current = [];
    setLoadedCount(0);
    setIsFullyLoaded(false);

    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedNum = String(i).padStart(3, '0');
      img.src = `${frameFolder}/frame_${paddedNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= Math.min(25, frameCount)) {
          setIsFullyLoaded(true);
        }
      };

      images.push(img);
    }

    globalFrameCache[productId] = images;
    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [productId, frameCount]);

  // Draw current frame filling full vertical viewport height (zero gaps top & bottom!)
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || images.length === 0) return;

    const safeIdx = Math.min(images.length - 1, Math.max(0, frameIdx));
    const img = images[safeIdx];
    if (!img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // Fill background with exact studio white/off-white matching frame edges!
    ctx.fillStyle = '#FAFAFA';
    ctx.fillRect(0, 0, width, height);

    // Calculate aspect fit filling 100% full vertical height (drawY = 0, drawH = height)
    const vWidth = img.naturalWidth;
    const vHeight = img.naturalHeight;
    const vAspect = vWidth / vHeight;

    const drawH = height;
    const drawW = drawH * vAspect;
    const drawX = (width - drawW) / 2;
    const drawY = 0;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Update canvas on scroll progress change
  useEffect(() => {
    if (mode !== 'scroll') return;
    const totalFrames = frameCount - 1;
    const targetIndex = Math.min(totalFrames, Math.max(0, Math.floor(scrollProgress * totalFrames)));

    setCurrentFrameIndex(targetIndex);
    drawFrame(targetIndex);
  }, [scrollProgress, mode, frameCount, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame, currentFrameIndex]);

  // Mouse & Touch Drag Event Handlers for 360 Manual Rotation
  const handleStart = (clientX) => {
    if (mode !== 'drag') return;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragStartFrame(currentFrameIndex);
  };

  const handleMove = useCallback(
    (clientX) => {
      if (!isDragging || mode !== 'drag') return;
      const deltaX = clientX - dragStartX;
      const totalFrames = frameCount - 1;
      let newFrame = dragStartFrame + Math.floor((deltaX / 300) * totalFrames);
      while (newFrame < 0) newFrame += totalFrames;
      while (newFrame > totalFrames) newFrame -= totalFrames;

      setCurrentFrameIndex(newFrame);
      drawFrame(newFrame);
    },
    [isDragging, mode, dragStartX, dragStartFrame, frameCount, drawFrame]
  );

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleStart(e.touches[0].clientX);
    }
  };

  const handleMouseMove = useCallback((e) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback(
    (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="relative w-screen h-screen flex items-center justify-center select-none overflow-hidden bg-[#FAFAFA]"
    >
      {/* 60FPS Studio Light Canvas Stage (Full Vertical Height!) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-500 ${
          isFullyLoaded ? 'opacity-100' : 'opacity-0'
        } ${mode === 'drag' ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : ''}`}
      />

      {/* Frame Loading Spinner */}
      {!isFullyLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-600 z-20">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-[11px] tracking-widest uppercase font-bold text-black">
            LOADING 3D STUDIO ({Math.round((loadedCount / frameCount) * 100)}%)
          </span>
        </div>
      )}

      {/* Floating HUD Controls Bar */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-40 flex items-center justify-between pointer-events-auto max-w-7xl mx-auto">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-full border border-black/10 shadow-md">
          <button
            onClick={() => {
              soundEngine.playToggle();
              setMode('scroll');
            }}
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-1 transition-all ${
              mode === 'scroll'
                ? 'bg-[#070709] text-white font-bold shadow-md'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SCROLL</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playToggle();
              setMode('drag');
            }}
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-1 transition-all ${
              mode === 'drag'
                ? 'bg-[#070709] text-white font-bold shadow-md'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>360° DRAG</span>
          </button>
        </div>

        {/* Rotation Counter */}
        <div className="hidden xs:flex items-center gap-2 font-mono text-[10px] text-zinc-700 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/10 shadow-md">
          <span className="flex items-center gap-1.5 text-black font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            360°: {Math.round((currentFrameIndex / (frameCount - 1)) * 360)}°
          </span>
        </div>
      </div>

    </div>
  );
}
