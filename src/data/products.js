// Authoritative Product Master Catalog & Scrollytelling Telemetry Data

export const PRODUCTS = [
  {
    id: "zenith-apex-01",
    slug: "zenith-apex-01",
    name: "ZENITH APEX 01",
    subtitle: "Cybernetic Kinetic Runner",
    category: "Footwear",
    price: 420,
    currency: "USD",
    video: "/Assets/Sneakers_01.webm",
    tagline: "KINETIC ENERGY RETURN SYSTEM",
    badge: "EDITION 01",
    rating: 4.9,
    description: "Engineered with carbon-weave lattice architecture and segmented impact dampeners for explosive momentum transfer.",
    details: [
      "Monofilament cyber-mesh upper for thermal dissipation",
      "Dynamic dual-density nitrogen foam core",
      "Full-length multi-stage carbon composite spring plate",
      "Laser-etched high-grip tread geometry"
    ],
    specs: {
      "WEIGHT": "285g (EU 42)",
      "OFFSET": "6.0 mm",
      "UPPER": "Aerospace Mesh",
      "MIDSOLE": "N2-Lattice + Carbon",
      "OUTSOLE": "Vulkanized Polymer"
    },
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "Obsidian Silver", hex: "#E4E4E7" },
      { name: "Neon Acid", hex: "#E2F544" },
      { name: "Stealth Black", hex: "#17171F" }
    ],
    hotspots: [
      { id: 1, progress: 0.22, x: 55, y: 48, label: "Carbon Spring Plate", text: "Multi-stage energy transfer leaf-spring" },
      { id: 2, progress: 0.50, x: 40, y: 35, label: "Aerospace Cyber-Mesh", text: "Micro-vented 3D knit with targeted tension bands" },
      { id: 3, progress: 0.78, x: 65, y: 70, label: "N2 Lattice Midsole", text: "Direct-injected nitrogen dampening matrix" }
    ],
    chapters: [
      {
        num: "01",
        title: "GEOMETRIC DISRUPTION",
        boldLead: "FORMED BY MOTION.",
        sub: "Every contour calculated for zero drag and instantaneous energy restitution."
      },
      {
        num: "02",
        title: "MATERIAL SCIENCE",
        boldLead: "CARBON & NITROGEN.",
        sub: "A dual-stage propulsion chassis that absorbs 45% more strike force than standard EVA."
      },
      {
        num: "03",
        title: "KINETIC BENCHMARKS",
        boldLead: "PURE TRANSMISSION.",
        sub: "Zero energy degradation over 1,000 continuous test kilometers."
      }
    ],
    adCreative: {
      headline: "BREAK THE GRAVITY BARRIER",
      tag: "CAMPAIGN 01 // KINETIC APEX",
      accent: "#E2F544"
    }
  },
  {
    id: "phantom-obsidian-02",
    slug: "phantom-obsidian-02",
    name: "PHANTOM OBSIDIAN 02",
    subtitle: "Sculptural Carbon Stealth Runner",
    category: "Footwear",
    price: 480,
    currency: "USD",
    video: "/Assets/Sneakers_02.webm",
    tagline: "MONOLITHIC CARBON FOOTWEAR",
    badge: "LIMITED 500",
    rating: 5.0,
    description: "An unyielding exercise in minimalism. Seamless unibody construction meets forged carbon reinforcement.",
    details: [
      "Forged carbon-fiber heel counter stability shell",
      "Seamless ultrasonic welded waterproof barrier",
      "Self-lacing tension cable wire retention mechanism",
      "Acoustically dampened shock absorption pads"
    ],
    specs: {
      "WEIGHT": "310g",
      "STRUCTURE": "Carbon Unibody",
      "CLOSURE": "Tension Cable",
      "DROP": "4.5 mm",
      "FINISH": "Matte Obsidian"
    },
    sizes: ["US 8.5", "US 9.5", "US 10.5", "US 11.5"],
    colors: [
      { name: "Raw Matte Black", hex: "#0A0A0E" },
      { name: "Titanium Grey", hex: "#6B7280" }
    ],
    hotspots: [
      { id: 1, progress: 0.30, x: 45, y: 50, label: "Ultrasonic Welds", text: "Zero-stitch water repellent seam barrier" },
      { id: 2, progress: 0.65, x: 60, y: 40, label: "Cable Tension Rig", text: "Micro-adjustable stainless steel cord lock" }
    ],
    chapters: [
      {
        num: "01",
        title: "UNIBODY SILHOUETTE",
        boldLead: "VOID OF EXCESS.",
        sub: "Sculpted from a singular form continuous loop."
      },
      {
        num: "02",
        title: "STEALTH ARCHITECTURE",
        boldLead: "ABSORB EVERYTHING.",
        sub: "Matte carbon compound engineered for total shock suppression."
      }
    ],
    adCreative: {
      headline: "DISAPPEAR INTO THE CITY",
      tag: "CAMPAIGN 02 // OBSIDIAN PHANTOM",
      accent: "#00F0FF"
    }
  },
  {
    id: "chronos-x-titanium",
    slug: "chronos-x-titanium",
    name: "CHRONOS-X TITANIUM",
    subtitle: "Skeleton Automatic Horology",
    category: "Timepieces",
    price: 1250,
    currency: "USD",
    video: "/Assets/Watch.webm",
    tagline: "GRADE 5 TITANIUM AUTOMATIC",
    badge: "SWISS MOVEMENT",
    rating: 4.9,
    description: "An open-heart horological masterpiece. Machined Grade 5 titanium case housing a high-beat skeleton mechanical calibre.",
    details: [
      "Grade 5 Titanium micro-blasted case & integrated bracelet",
      "Scratchproof anti-reflective sapphire crystal front & back",
      "28,800 VPH high-frequency automatic movement with 72h power reserve",
      "100M water resistance with double screw-down crown"
    ],
    specs: {
      "CASE DIAMETER": "41 mm",
      "THICKNESS": "9.8 mm",
      "MOVEMENT": "Calibre X-901",
      "POWER RESERVE": "72 Hours",
      "CRYSTAL": "Sapphire Dual AR"
    },
    sizes: ["41mm Standard"],
    colors: [
      { name: "Titanium Silver", hex: "#D1D5DB" },
      { name: "DLC Night", hex: "#1F2937" }
    ],
    hotspots: [
      { id: 1, progress: 0.25, x: 50, y: 45, label: "Skeleton Escapement", text: "Silicon balance wheel beating at 4Hz" },
      { id: 2, progress: 0.60, x: 35, y: 55, label: "Grade 5 Titanium", text: "Machined to 2-micron tolerances" }
    ],
    chapters: [
      {
        num: "01",
        title: "HOROLOGICAL ARCHITECTURE",
        boldLead: "TIME UNMASKED.",
        sub: "216 individual mechanical components suspended in sapphire clarity."
      },
      {
        num: "02",
        title: "TITANIUM CHASSIS",
        boldLead: "INDISTRUCTIBLE ELEGANCE.",
        sub: "40% lighter than stainless steel with twice the structural yield strength."
      }
    ],
    adCreative: {
      headline: "PRECISION AT THE ATOMIC LEVEL",
      tag: "CAMPAIGN 03 // HOROLOGY X",
      accent: "#E4E4E7"
    }
  },
  {
    id: "vector-stealth-drone",
    slug: "vector-stealth-drone",
    name: "VECTOR STEALTH 8K",
    subtitle: "Autonomous Carbon Cinema Drone",
    category: "Tech",
    price: 2100,
    currency: "USD",
    video: "/Assets/drone.webm",
    tagline: "8K 60FPS CINEMATIC FLIGHT",
    badge: "PRO FLIGHT",
    rating: 5.0,
    description: "Autonomous aerial imaging platform with omnidirectional LiDAR avoidance and 1-inch sensor full-frame optics.",
    details: [
      "Foldable carbon-fiber composite quad-rotor arm system",
      "8K Apple ProRes RAW video recording via internal NVMe SSD",
      "Omnidirectional 360 LiDAR + Optical flow collision prevention",
      "45 minute flight time per intelligent battery cell"
    ],
    specs: {
      "MAX SPEED": "95 km/h",
      "RANGE": "15 km OcuSync",
      "SENSOR": "1.0-inch CMOS",
      "PAYLOAD": "1.2 kg",
      "WEIGHT": "890g"
    },
    sizes: ["Standard Pro Kit"],
    colors: [
      { name: "Stealth Grey", hex: "#374151" }
    ],
    hotspots: [
      { id: 1, progress: 0.35, x: 52, y: 42, label: "Gimbal 3-Axis", text: "Brushless motor stabilization accurate to 0.005 degrees" },
      { id: 2, progress: 0.70, x: 42, y: 62, label: "LiDAR Telemetry", text: "3D point-cloud mapping up to 50 meters" }
    ],
    chapters: [
      {
        num: "01",
        title: "AERIAL SUPREMACY",
        boldLead: "CINEMATIC FREEDOM.",
        sub: "Capture uncompromised 8K 60FPS ProRes video in zero-visibility wind profiles."
      },
      {
        num: "02",
        title: "LiDAR NAVIGATOR",
        boldLead: "ABSOLUTE AUTONOMY.",
        sub: "Self-navigating obstacle avoidance recalculates flight vectors 100 times per second."
      }
    ],
    adCreative: {
      headline: "SEE THE WORLD FROM ABOVE",
      tag: "CAMPAIGN 04 // VECTOR FLIGHT",
      accent: "#00F0FF"
    }
  },
  {
    id: "aura-thermal-espresso",
    slug: "aura-thermal-espresso",
    name: "AURA THERMAL BARISTA",
    subtitle: "Dual-Boiler Precision Espresso Machine",
    category: "Lifestyle",
    price: 1850,
    currency: "USD",
    video: "/Assets/expresso_machine.webm",
    tagline: "COMMERCIAL PRESSURE ACCURACY",
    badge: "HAND BUILT",
    rating: 4.9,
    description: "Commercial grade dual-boiler coffee workstation with PID thermal stability, digital flow profiling, and tactile rotary dials.",
    details: [
      "Dual stainless steel boilers with independent PID thermal loops",
      "Rotary vane pump with real-time pressure profiling wheel",
      "Saturated E61 grouphead with active heating element",
      "Machined aluminum chassis with oiled walnut accents"
    ],
    specs: {
      "BOILER CAPACITY": "2.8L + 0.8L",
      "PUMP": "Rotary Vane 9 BAR",
      "THERMAL ACCURACY": "± 0.1°C",
      "WEIGHT": "28 kg",
      "POWER": "2200W Dual PID"
    },
    sizes: ["220V / 110V"],
    colors: [
      { name: "Matte Black & Walnut", hex: "#17171F" },
      { name: "Brushed Steel", hex: "#9CA3AF" }
    ],
    hotspots: [
      { id: 1, progress: 0.30, x: 48, y: 38, label: "PID Dual Boilers", text: "Independent coffee & steam thermal loops" },
      { id: 2, progress: 0.72, x: 55, y: 65, label: "Rotary Flow Profiler", text: "Manual pressure control lever from 1 to 12 BAR" }
    ],
    chapters: [
      {
        num: "01",
        title: "THERMAL DOMINANCE",
        boldLead: "THE ACCURATE SHOT.",
        sub: "Maintain 93.5°C brew extraction temperature down to a tenth of a degree."
      },
      {
        num: "02",
        title: "PRESSURE FLUIDICS",
        boldLead: "CRAFT YOUR VELOCITY.",
        sub: "Sculpt flavor extraction curves in real time."
      }
    ],
    adCreative: {
      headline: "THE ART OF EXTRACTION",
      tag: "CAMPAIGN 05 // AURA THERMAL",
      accent: "#DFB069"
    }
  },
  {
    id: "acoustic-pro-headphones",
    slug: "acoustic-pro-headphones",
    name: "ACOUSTIC PRO SPATIAL",
    subtitle: "Planar Magnetic ANC Studio Headphones",
    category: "Audio",
    price: 650,
    currency: "USD",
    video: "/Assets/headphones.webm",
    tagline: "SPATIAL AUDIO FIDELITY",
    badge: "AUDIOPHILE",
    rating: 5.0,
    description: "Planar magnetic ultra-thin diaphragm drivers delivering uncompressed 192kHz/24-bit studio reference clarity with active noise suppression.",
    details: [
      "50mm ultra-thin planar magnetic transducers with neodymium magnet array",
      "Hybrid adaptive Active Noise Cancellation (40dB reduction)",
      "Memory foam ear cushions wrapped in magnetic lambskin leather",
      "50-hour continuous battery life with USB-C lossless DAC mode"
    ],
    specs: {
      "DRIVER": "50mm Planar",
      "FREQ RESPONSE": "5Hz - 50,000Hz",
      "IMPEDANCE": "32 Ohms",
      "BATTERY": "50 Hours",
      "WEIGHT": "340g"
    },
    sizes: ["Over-Ear Universal"],
    colors: [
      { name: "Obsidian Black", hex: "#111116" },
      { name: "Silver Anodized", hex: "#E4E4E7" }
    ],
    hotspots: [
      { id: 1, progress: 0.28, x: 52, y: 40, label: "Planar Diaphragm", text: "Sub-micron transducer for zero distortion audio" },
      { id: 2, progress: 0.65, x: 38, y: 58, label: "Lambskin Cushion", text: "Acoustically isolated high-density foam" }
    ],
    chapters: [
      {
        num: "01",
        title: "TRANSDUCER ARCHITECTURE",
        boldLead: "PURE UNCOMPRESSED SOUND.",
        sub: "Planar drivers eliminate modal breakup across the entire audible frequency spectrum."
      },
      {
        num: "02",
        title: "ACOUSTIC ISOLATION",
        boldLead: "SILENCE THE NOISE.",
        sub: "Adaptive neural ANC cancels unwanted background frequency spikes instantly."
      }
    ],
    adCreative: {
      headline: "PURE ACOUSTIC IMMERSION",
      tag: "CAMPAIGN 06 // ACOUSTIC PRO",
      accent: "#E2F544"
    }
  },
  {
    id: "lelixir-extrait-noir",
    slug: "lelixir-extrait-noir",
    name: "L'ELIXIR EXTRAIT NOIR",
    subtitle: "Artisan Haute Parfumerie 100ml",
    category: "Lifestyle",
    price: 320,
    currency: "USD",
    video: "/Assets/perfume.webm",
    tagline: "35% CONCENTRATION EXTRAIT",
    badge: "ARTISAN",
    rating: 4.8,
    description: "A dark olfactory symphony of smoked oud, rare black saffron, obsidian amber, and Guatemalan cardamom encased in hand-blown smoked glass.",
    details: [
      "Extrait de Parfum 35% oil concentration for 18+ hour longevity",
      "Ingredients sourced from sustainable artisan harvests in Grasse",
      "Hand-blown dark smoked crystal bottle with magnetic cap",
      "Notes: Smoked Oud, Black Saffron, Leather Accord, Dark Amber"
    ],
    specs: {
      "VOLUME": "100ml / 3.4 fl oz",
      "TYPE": "Extrait de Parfum",
      "CONCENTRATION": "35%",
      "ORIGIN": "Grasse, France",
      "LONGEVITY": "18+ Hours"
    },
    sizes: ["100ml Bottle"],
    colors: [
      { name: "Smoked Obsidian Glass", hex: "#1F2937" }
    ],
    hotspots: [
      { id: 1, progress: 0.40, x: 50, y: 50, label: "Smoked Crystal", text: "UV-protective heavy lead crystal vessel" }
    ],
    chapters: [
      {
        num: "01",
        title: "OLFACTORY ALCHEMY",
        boldLead: "DARK. MESMERIZING.",
        sub: "Crafted in small batches with aged natural absolutes."
      },
      {
        num: "02",
        title: "VESSEL DESIGN",
        boldLead: "TACTILE LUXURY.",
        sub: "Weighted magnetic enclosure precision machined from dark aluminum."
      }
    ],
    adCreative: {
      headline: "THE SCENT OF SHADOWS",
      tag: "CAMPAIGN 07 // EXTRAIT NOIR",
      accent: "#DFB069"
    }
  },
  {
    id: "cine-alpha-8k-camera",
    slug: "cine-alpha-8k-camera",
    name: "CINE-ALPHA 8K PRO",
    subtitle: "Full-Frame Anamorphic Cinema Camera",
    category: "Tech",
    price: 3800,
    currency: "USD",
    video: "/Assets/sony_camera.webm",
    tagline: "8K 120FPS 16-BIT RAW CINEMA",
    badge: "CINEMA SYSTEM",
    rating: 5.0,
    description: "State-of-the-art full-frame cinema sensor with 16+ stops of dynamic range, internal electronic ND filters, and dual native ISO.",
    details: [
      "8.6K Full-Frame CMOS sensor with 16+ stops dynamic range",
      "Dual Native ISO 800 / 3200 for flawless low-light latitude",
      "Stepless electronic variable ND filter (1/4 to 1/128)",
      "Magnesium alloy body with active silent convection cooling"
    ],
    specs: {
      "SENSOR": "8.6K Full-Frame",
      "DYNAMIC RANGE": "16+ Stops",
      "CODECS": "ProRes 4444 XQ / RAW",
      "MOUNT": "E-Mount Locking",
      "WEIGHT": "1.4 kg"
    },
    sizes: ["Body Only"],
    colors: [
      { name: "Magnesium Matte Black", hex: "#111116" }
    ],
    hotspots: [
      { id: 1, progress: 0.32, x: 46, y: 44, label: "8.6K Sensor Block", text: "Stabilized 5-axis full-frame imaging surface" },
      { id: 2, progress: 0.68, x: 58, y: 52, label: "e-ND Filter Module", text: "Liquid crystal optical density control" }
    ],
    chapters: [
      {
        num: "01",
        title: "SENSOR MAGNIFICENCE",
        boldLead: "UNCOMPROMISED LATITUDE.",
        sub: "Capture subtle highlight roll-off and deep shadow detail in 16-bit RAW."
      },
      {
        num: "02",
        title: "OPTICAL PRECISION",
        boldLead: "ANAMORPHIC DOMINANCE.",
        sub: "Full de-squeeze support for anamorphic cine glass."
      }
    ],
    adCreative: {
      headline: "MASTER THE CINEMATIC FRAME",
      tag: "CAMPAIGN 08 // CINE ALPHA",
      accent: "#00F0FF"
    }
  }
];

export const CATEGORIES = ["All", "Footwear", "Timepieces", "Tech", "Audio", "Lifestyle"];
