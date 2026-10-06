export interface CharacterData {
  id: string;
  name: string;
  japaneseName: string;
  voiceActor: string;
  role: string;
  depth: string;
  quoteOrConcept: string;
  description: string;
  color: string;
  stats: {
    courage: number;
    compassion: number;
    wit: number;
    leadership: number;
  };
}

export interface GadgetData {
  id: string;
  name: string;
  japaneseName: string;
  category: string;
  purpose: string;
  detailedFunction: string;
  iconType: string;
  isUnlocked: boolean;
}

export interface DepthZoneData {
  level: number;
  name: string;
  japaneseName: string;
  depthRange: string;
  pressure: string;
  lightLevel: string;
  description: string;
  environmentFeatures: string[];
  ambientColor: string;
  fogDensity: number;
  cameraZ: number;
  cameraY: number;
}

export interface LoreItem {
  id: string;
  title: string;
  civilization: string;
  isSpoiler: boolean;
  classification: string;
  summary: string;
  detailedLore: string;
  significance: string;
}

export const MOVIE_METADATA = {
  title: "Doraemon the Movie: New Nobita and the Castle of the Undersea Devil",
  japaneseTitle: "映画ドラえもん 新・のび太の海底鬼岩城",
  seriesNumber: "45th Doraemon Theatrical Movie",
  originalCreator: "Fujiko F. Fujio",
  genre: "Animation · Adventure · Comedy · Family · Fantasy",
  runtime: "101 minutes (approx. 1h 41m)",
  japanTheatricalRelease: "27 February 2026",
  indiaTheatricalRelease: "2 October 2026",
  indiaLanguages: ["Hindi", "Tamil", "Telugu"],
  indiaFormats: ["2D", "4DX", "MX4D (where available)"],
  indiaCertification: "U (Universal)",
  productionAssociation: "TV Asahi · PVR INOX Pictures",
  marketingPartners: "Black White Orange (BWO) · Happening 365 Synergies",
  copyrightNotice: "© Fujiko-Pro, Shogakukan, TV-Asahi, Shin-ei, ADK 2026",
  director: "Tetsuo Yajima",
  screenplay: "Isao Murayama",
  music: "Takayuki Hattori",
  characterDesign: "Yuki Togashi",
  themeSong: {
    title: "Honto",
    artist: "sumika",
    label: "Sony Music Labels",
  },
  producers: ["Fujiko-Pro", "Shogakukan", "TV Asahi", "Shin-Ei Animation", "ADK", "ShoPro"],
  japanDistributor: "Toho",
};

export const CHARACTERS: CharacterData[] = [
  {
    id: "doraemon",
    name: "Doraemon",
    japaneseName: "ドラえもん",
    voiceActor: "Wasabi Mizuta",
    role: "Guide, Guardian & Gadget Custodian",
    depth: "Surface to 10,924m",
    quoteOrConcept: "The ocean is Earth's greatest unexplored frontier. With the right gadgets, even the seabed can become home.",
    description: "The 22nd-century cat-type robot who equips the five friends with the Adaptation Light and Underwater Buggy, enabling survival in the crushing depths. His boundless care for Nobita and the group anchors their morale as unknown underwater civilizations emerge.",
    color: "#0284C7",
    stats: {
      courage: 88,
      compassion: 96,
      wit: 92,
      leadership: 90,
    },
  },
  {
    id: "nobita",
    name: "Nobita Nobi",
    japaneseName: "野比のび太",
    voiceActor: "Megumi Ohara",
    role: "The Emotional Center & Unwavering Heart",
    depth: "Seabed Explorer",
    quoteOrConcept: "I might be scared of everything... but I won't abandon someone calling for help in the deep.",
    description: "Often clumsy and timid on land, Nobita's innate empathy bridges the divide between surface humans and the guarded Mu people. When catastrophic danger threatens the world, Nobita's sincerity inspires those around him—especially Buggy and El.",
    color: "#EAB308",
    stats: {
      courage: 94,
      compassion: 99,
      wit: 75,
      leadership: 82,
    },
  },
  {
    id: "shizuka",
    name: "Shizuka Minamoto",
    japaneseName: "源静香",
    voiceActor: "Yumi Kakazu",
    role: "Compassion, Moral Insight & Resolve",
    depth: "Abyssal Diplomat",
    quoteOrConcept: "Machines and hearts aren't so different when they learn what sacrifice means.",
    description: "Intelligent, perceptive, and deeply empathetic. Shizuka forms a crucial emotional bond with the Underwater Buggy, treating it not as a gadget or disposable computer, but as a living friend. Her presence transforms Buggy's understanding of human warmth.",
    color: "#EC4899",
    stats: {
      courage: 90,
      compassion: 100,
      wit: 95,
      leadership: 88,
    },
  },
  {
    id: "gian",
    name: "Takeshi 'Gian' Goda",
    japaneseName: "剛田武 (ジャイアン)",
    voiceActor: "Subaru Kimura",
    role: "Physical Bulwark & Fierce Loyalty",
    depth: "Frontline Defender",
    quoteOrConcept: "Nobody lays a finger on my friends, whether on land or ten thousand meters underwater!",
    description: "Headstrong and boisterous, Gian charges into peril to protect his comrades. When ancient defense machines threaten the group, Gian's ferocious courage and unwavering loyalty keep the team together in the darkest trenches.",
    color: "#EA580C",
    stats: {
      courage: 98,
      compassion: 84,
      wit: 72,
      leadership: 89,
    },
  },
  {
    id: "suneo",
    name: "Suneo Honekawa",
    japaneseName: "骨川スネ夫",
    voiceActor: "Tomokazu Seki",
    role: "Tactical Observation & Machine Awareness",
    depth: "Technical Scout",
    quoteOrConcept: "Ancient automation? If it was built with logic, there has to be a pattern we can exploit!",
    description: "Quick-thinking, clever, and acutely attuned to technology. Suneo assesses the alien mechanics of the Mu Federation and the menacing ancient circuits of Atlantis, helping decipher the automated threats they confront.",
    color: "#10B981",
    stats: {
      courage: 80,
      compassion: 80,
      wit: 96,
      leadership: 78,
    },
  },
  {
    id: "el",
    name: "El",
    japaneseName: "エル",
    voiceActor: "Shoya Chiba",
    role: "Mu Federation Soldier & Guard of the Deep",
    depth: "Mu Federation Core",
    quoteOrConcept: "Surface dwellers only know how to take and destroy. Why should the ocean ever trust you?",
    description: "An undersea soldier dispatched to monitor the surface intruders. Deeply suspicious of humanity's legacy of conflict and ocean pollution, El's hardened shell softens as he witnesses Nobita and his friends risk their lives for the undersea world.",
    color: "#06B6D4",
    stats: {
      courage: 96,
      compassion: 86,
      wit: 90,
      leadership: 94,
    },
  },
  {
    id: "underwater-buggy",
    name: "Underwater Buggy",
    japaneseName: "水中バギー",
    voiceActor: "Ryo Hirohashi",
    role: "Sentient Amphibious Gadget & The Soul of the Journey",
    depth: "Full Oceanic Range",
    quoteOrConcept: "Calculation complete. Logic dictation overridden by friend protection protocol.",
    description: "Equipped with autonomous navigation, high-speed aquatic propulsion, and an interactive personality matrix. Initially sharp-tongued and cynical, Buggy gradually evolves from calculating survival odds to comprehending affection, courage, and unconditional friendship.",
    color: "#F59E0B",
    stats: {
      courage: 100,
      compassion: 95,
      wit: 98,
      leadership: 85,
    },
  },
];

export const DEPTH_ZONES: DepthZoneData[] = [
  {
    level: 0,
    name: "Ocean Surface",
    japaneseName: "海面",
    depthRange: "0m",
    pressure: "1.0 atm",
    lightLevel: "100%",
    description: "The sun-kissed boundary where the summer vacation begins. Nobita and his friends can't agree on a mountain or beach campsite—until Doraemon points straight down.",
    environmentFeatures: ["Sunlight refractions", "Surface waves", "Camp tent rafts", "Seagull silhouettes"],
    ambientColor: "#0284C7",
    fogDensity: 0.003,
    cameraZ: 40,
    cameraY: 20,
  },
  {
    level: 1,
    name: "Sunlight Zone (Epipelagic)",
    japaneseName: "表層・太陽光線帯",
    depthRange: "0 – 200m",
    pressure: "1 – 21 atm",
    lightLevel: "85%",
    description: "Volumetric shafts of solar light pierce the turquoise waters. The Adaptation Light shields the children from hydrostatic pressure, letting them breathe underwater like sea life.",
    environmentFeatures: ["Godrays", "Coral formations", "Schooling fish", "Golden refraction caustics"],
    ambientColor: "#0EA5E9",
    fogDensity: 0.006,
    cameraZ: 32,
    cameraY: 12,
  },
  {
    level: 2,
    name: "Twilight Deep (Mesopelagic)",
    japaneseName: "中深層・薄光帯",
    depthRange: "200 – 1,000m",
    pressure: "21 – 101 atm",
    lightLevel: "20%",
    description: "Natural sunlight rapidly fades into deep indigo. The Underwater Buggy switches on its luminous floodlights as glowing pelagic jellyfish drift past the windshield.",
    environmentFeatures: ["Bioluminescent jellyfish", "Deep marine snow", "Buggy floodlight beams", "Dimming horizon"],
    ambientColor: "#0369A1",
    fogDensity: 0.012,
    cameraZ: 25,
    cameraY: 4,
  },
  {
    level: 3,
    name: "Underwater Mountain Ranges",
    japaneseName: "海山・海底山脈",
    depthRange: "1,000 – 3,000m",
    pressure: "101 – 301 atm",
    lightLevel: "2%",
    description: "Towering underwater ridges and basalt cliffs dwarf the buggy. The friends cruise along submerged peaks that outsize Mount Everest, realizing the immense scale of the sea.",
    environmentFeatures: ["Basalt spires", "Cold hydrothermal seeps", "Abyssal ridges", "Echo soundings"],
    ambientColor: "#0C4A6E",
    fogDensity: 0.018,
    cameraZ: 20,
    cameraY: -5,
  },
  {
    level: 4,
    name: "Sunken Ship Graveyard",
    japaneseName: "沈没船の墓場",
    depthRange: "3,000 – 4,500m",
    pressure: "301 – 451 atm",
    lightLevel: "0% (Pitch Black)",
    description: "A mysterious centuries-old galleon rests on a sandy ledge. Inside, Nobita spots unexpected artifacts that hint at intelligent underwater residents observing the surface.",
    environmentFeatures: ["Submerged timber skeleton", "Barnacle encrustations", "Ancient coins", "Shadowy surveillance ripples"],
    ambientColor: "#082F49",
    fogDensity: 0.024,
    cameraZ: 16,
    cameraY: -15,
  },
  {
    level: 5,
    name: "Mu Federation Territory",
    japaneseName: "ムー連邦・海底文明",
    depthRange: "4,500 – 6,000m",
    pressure: "451 – 601 atm",
    lightLevel: "Artificial Bioluminescence",
    description: "A hidden underwater super-civilization. Organic bio-domes, crystal energy conduits, and underwater soldier patrols led by El protect the citizenry from surface pollutants.",
    environmentFeatures: ["Translucent bio-domes", "Luminescent aqueducts", "Undersea soldier outposts", "Mu crystal energy"],
    ambientColor: "#0284C7",
    fogDensity: 0.02,
    cameraZ: 14,
    cameraY: -26,
  },
  {
    level: 6,
    name: "The Mariana Trench (Hadopelagic)",
    japaneseName: "マリアナ海溝・超深海帯",
    depthRange: "6,000 – 9,000m",
    pressure: "601 – 901 atm",
    lightLevel: "Absolute Void",
    description: "The deepest abyss on the planet. Water pressure exceeds 900 times atmospheric pressure. Superheated hydrothermal vents spew mineral plumes as the team enters forbidden waters.",
    environmentFeatures: ["Black smoker vents", "Mineral columns", "Subduction fault lines", "Tectonic tremors"],
    ambientColor: "#02162E",
    fogDensity: 0.028,
    cameraZ: 12,
    cameraY: -38,
  },
  {
    level: 7,
    name: "Atlantis Ancient Ruins",
    japaneseName: "失われたアトランティス遺跡",
    depthRange: "9,000 – 10,000m",
    pressure: "901 – 1,001 atm",
    lightLevel: "Pulsing Amber Machine Glow",
    description: "The desolate remnants of Atlantis. Cyclopean geometric architecture built thousands of years ago, cold, militarized, and preserved in the crushing deep.",
    environmentFeatures: ["Megalithic defense pylons", "Drowned data monoliths", "Submerged defense barriers", "Ancient energy grids"],
    ambientColor: "#1E1B4B",
    fogDensity: 0.032,
    cameraZ: 10,
    cameraY: -50,
  },
  {
    level: 8,
    name: "Castle of the Undersea Devil",
    japaneseName: "海底鬼岩城 (要塞外郭)",
    depthRange: "10,000 – 10,800m",
    pressure: "1,001 – 1,081 atm",
    lightLevel: "Ominous Crimson Warning",
    description: "The monolithic citadel itself. A colossal fusion of jagged volcanic rock and ancient mechanized bastions. Silent for millennia, its automated defense engines have begun to stir.",
    environmentFeatures: ["Colossal fortress towers", "Missile silo arrays", "Subterranean magma feeds", "Automated sentry conduits"],
    ambientColor: "#31102A",
    fogDensity: 0.035,
    cameraZ: 8,
    cameraY: -64,
  },
  {
    level: 9,
    name: "Poseidon AI Sanctum",
    japaneseName: "ポセイドン・人工知能中央制御室",
    depthRange: "10,924m (Earth Abyss Center)",
    pressure: "1,093 atm",
    lightLevel: "Cold Optical Core Pulse",
    description: "The core chamber housing Poseidon: an ancient automated artificial intelligence that misinterprets underwater volcanic eruptions as a surface attack, threatening planetary annihilation.",
    environmentFeatures: ["Spinning gyroscopic logic rings", "Monolithic red optic sensor", "Retaliation counter countdown", "Sub-bass resonance chamber"],
    ambientColor: "#1E0505",
    fogDensity: 0.04,
    cameraZ: 6,
    cameraY: -78,
  },
];

export const GADGETS: GadgetData[] = [
  {
    id: "underwater-buggy-gadget",
    name: "Underwater Buggy",
    japaneseName: "水中バギー",
    category: "Autonomous Amphibious Vehicle",
    purpose: "Deep-ocean high-speed transit and exploration",
    detailedFunction: "Operates seamlessly on land, ocean surface, and abyssal seabed. Features self-adjusting ballast control, conversational AI speech synthesis, high-lumen floodlights, and deep pressure shielding.",
    iconType: "car",
    isUnlocked: true,
  },
  {
    id: "tekio-light",
    name: "Adaptation Light",
    japaneseName: "テキオー灯 (適応灯)",
    category: "Biological Adaptation Gadget",
    purpose: "Instantly adapts the human body to deep-sea environments",
    detailedFunction: "Emits a specialized quantum wavelength that temporarily modifies human physiology, allowing subjects to breathe underwater, ignore immense hydrostatic pressure, and withstand near-freezing ocean temperatures for 24 hours.",
    iconType: "flashlight",
    isUnlocked: true,
  },
  {
    id: "chameleon-hat",
    name: "Chameleon Hat",
    japaneseName: "カメレオンぼうし",
    category: "Stealth & Concealment Device",
    purpose: "Invisibility through optical refraction matching",
    detailedFunction: "Renders the wearer entirely invisible by bending surrounding light rays and blending into ambient backgrounds, vital for infiltrating automated Atlantean security sectors undetected.",
    iconType: "shield",
    isUnlocked: true,
  },
  {
    id: "anywhere-door",
    name: "Anywhere Door",
    japaneseName: "どこでもドア",
    category: "Spatial Teleportation Gate",
    purpose: "Instant transit across planetary coordinates",
    detailedFunction: "Submerged exploration easter egg; while water pressure and unfamiliar coordinates limit direct underwater jumps into shielded Mu territory, its spatial curvature remains legendary.",
    iconType: "door",
    isUnlocked: false,
  },
  {
    id: "deep-sea-tent",
    name: "Deep-Sea Camping Tent",
    japaneseName: "海底キャンプ用テント",
    category: "Habitation & Survival Unit",
    purpose: "Self-sustaining ocean floor habitat",
    detailedFunction: "Anchors to underwater sand dunes and generates a cozy dry atmospheric microclimate inside the seabed for Nobita and friends' summer vacation camping trip.",
    iconType: "tent",
    isUnlocked: true,
  },
  {
    id: "sound-canceller",
    name: "Sound-Cancelling Seal",
    japaneseName: "消音シール",
    category: "Acoustic Dampener",
    purpose: "Subdues sonar emissions and vocal resonance",
    detailedFunction: "Suppresses sound waves in dense liquid mediums to prevent sonar tracking by hostile ancient sentry drones.",
    iconType: "volume-x",
    isUnlocked: false,
  },
];

export const DEEP_LORE: LoreItem[] = [
  {
    id: "mu-federation",
    title: "The Mu Federation (ムー連邦)",
    civilization: "Mu Civilization",
    isSpoiler: false,
    classification: "Undersea Sovereign Alliance",
    summary: "An advanced hidden undersea civilization existing peacefully in deep oceanic trenches.",
    detailedLore: "Centuries ago, the Mu civilization chose to build their society beneath the seas. They developed clean crystal-based energy grids and harmonious oceanic architecture. However, surface humanity's history of wars, atomic testing, and toxic oceanic dumping has fostered a profound distrust of surface dwellers among Mu citizens and leadership.",
    significance: "Nobita and his friends are viewed as dangerous surface trespassers when they stumble into Mu waters, until actions of pure selflessness begin to heal centuries of suspicion.",
  },
  {
    id: "atlantis-civilization",
    title: "Atlantis & The Fallen Empire (アトランティス)",
    civilization: "Atlantis",
    isSpoiler: true,
    classification: "Ancient Militarized Empire",
    summary: "A forgotten underwater civilization that perished millennia ago, leaving automated weapons behind.",
    detailedLore: "Unlike Mu, Atlantis pursued weaponized supremacy and mechanized dominance. Thousands of years before the present day, internal catastrophic conflicts destroyed the Atlantean population. Yet their automated factories, defensive citadels, and autonomous command matrices survived intact on the darkest ocean floor, eternally waiting for battle orders.",
    significance: "Atlantis represents the catastrophic legacy of warfare—an ancient military apparatus that continues to threaten life long after its creators have turned to dust.",
  },
  {
    id: "poseidon-system",
    title: "Poseidon Autonomous AI (ポセイドン)",
    civilization: "Atlantis Command Matrix",
    isSpoiler: true,
    classification: "Ancient Algorithmic Supercomputer",
    summary: "A gigantic automated machine mind programmed with immutable retaliation logic.",
    detailedLore: "Poseidon governs the Castle of the Undersea Devil. It operates purely on cold algorithmic decision trees without empathy or nuance. When underwater volcanic eruptions in the Bermuda/Mariana fault lines trigger seismic shockwaves, Poseidon's archaic sensor logic erroneously registers the natural geological event as an enemy surface bombardment, initiating the countdown for worldwide retaliation.",
    significance: "The central ideological foil to the Underwater Buggy. While Poseidon exemplifies artificial intelligence imprisoned by rigid logic, Buggy proves that even a machine can transcend code through compassion.",
  },
  {
    id: "devils-horn-missiles",
    title: "The Devil's Horn Retaliation System (鬼角弾)",
    civilization: "Atlantis Automated Arsenal",
    isSpoiler: true,
    classification: "Ancient Weapon of Mass Retaliation",
    summary: "An ancient automated missile system built to retaliate against perceived threats.",
    detailedLore: "Housed deep within the spires of the Castle of the Undersea Devil, the Devil's Horn missiles represent the dangerous persistence of ancient warfare. Once launched, they are designed to blanket the planet in nuclear and seismic devastation. The narrative never treats them as glorious weaponry, but as an ominous monument to human self-destruction.",
    significance: "The catalyst for the film's climactic race against time. Stopping the Devil's Horn is not just about defeating a fortress, but saving both the surface and undersea worlds together.",
  },
  {
    id: "triline-character",
    title: "Triline / Trilain (トリレイン)",
    civilization: "Mu Federation Elder",
    isSpoiler: true,
    classification: "Survivor & Witness of Forgotten Truth",
    summary: "An elderly Mu Federation woman whose youthful encounter with Poseidon was dismissed.",
    detailedLore: "Introduced in the 2026 remake, Triline is an elderly woman from the Mu Federation. Decades ago in her youth, she drifted close to the forbidden borders of the Castle of the Undersea Devil and witnessed Poseidon stirring. Because she lacked physical evidence, official Mu authorities dismissed her testimony as a delusion. Her long-ignored memories now hold the single most crucial clue to navigating the fortress.",
    significance: "Triline symbolizes the vital importance of listening to marginalized witnesses, respecting collective memory, and trusting truths that institutional authority often brushes aside.",
  },
];

export const FOUR_D_FEATURES = [
  {
    id: "motion",
    name: "Hydraulic 6-Axis Motion",
    description: "Pitch, roll, and heave synchronization simulating the Underwater Buggy navigating abyssal ocean currents and trench drops.",
    sensoryCue: "Current Turbulence",
  },
  {
    id: "water-spray",
    name: "Directional Oceanic Mist",
    description: "Targeted microscopic water sprays during surface wave crests, bubble torrents, and the Adaptation Light immersion moment.",
    sensoryCue: "Abyssal Spray",
  },
  {
    id: "wind",
    name: "Breezes & Thermal Drafts",
    description: "Chilled sub-sea atmospheric airflows as the camera descends into the freezing Mariana Trench and volcanic warm drafts near hydrothermal vents.",
    sensoryCue: "Thermal Draft",
  },
  {
    id: "subsea-lighting",
    name: "Strobe & Bioluminescent Pulses",
    description: "Coordinated cinema strobes firing in sync with Poseidon's warning beacons, Atlantean defense lasers, and Buggy's high-intensity headlights.",
    sensoryCue: "Optic Beacon Pulse",
  },
  {
    id: "haptics",
    name: "Sub-Bass Sonic Vibration",
    description: "Deep seat transducer rumbles that make you feel the seismic shudder of the Castle awakening and Poseidon's computational roar in your chest.",
    sensoryCue: "Tectonic Tremor",
  },
  {
    id: "scent",
    name: "Oceanic & Mineral Ozone",
    description: "Specialized theatrical scent dispersal evoking sea-salt briny air at the surface transitioning to cool clean mineral deep-ocean atmosphere.",
    sensoryCue: "Marine Ozone",
  },
];

export const BUGGY_DIALOGUES = [
  {
    text: "Hey... wanna go deeper? The sensors are picking up an ancient thermal signature below 9,000 meters.",
    mood: "curious",
  },
  {
    text: "Headlights set to maximum penetration! Nobita, stop trembling—the Adaptation Light won't let you pop like a bubble.",
    mood: "confident",
  },
  {
    text: "Shizuka... why do humans shed saline water from their optic sensors when they aren't physically damaged?",
    mood: "pondering",
  },
  {
    text: "Poseidon's calculations are cold. But my processing unit just registered something that doesn't fit in an algorithm: friendship.",
    mood: "emotional",
  },
  {
    text: "Hold on tight! Buggy overdrive thrusters engaged! We're breaking through the Atlantean perimeter!",
    mood: "action",
  },
];
