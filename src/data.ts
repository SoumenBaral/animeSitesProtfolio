export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  demoUrl: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
  mockupType: 'stream' | 'manga' | 'card' | 'tracker' | 'audio';
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  rarity: 'SSR' | 'SR' | 'R';
  category: 'frontend' | 'backend' | 'tools';
  rpgStatName: string;
  rpgStatValue: string;
}

export interface Testimonial {
  character: string;
  anime: string;
  quote: string;
  avatar: string;
  relation: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'anistream',
    title: 'AniStream',
    category: 'Streaming & Sync Watch-Party',
    description: 'A high-performance streaming interface featuring low-latency synchronized playback and active room chat for anime community watch-parties.',
    longDescription: 'AniStream redefines how fans watch anime together. Utilizing Vue 3 and WebSockets, it provides a zero-lag synchronized video playback engine. Features include custom ambient theater lighting that reflects the video color palette (glowing border effects), a real-time responsive chat with anime-emoji support, interactive custom reaction triggers that splash onto the screen, and room hosting controls.',
    tags: ['Vue 3', 'WebRTC', 'Tailwind CSS', 'WebSockets', 'Canvas API'],
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
    demoUrl: '#',
    metrics: [
      { label: 'Latency', value: '< 45ms' },
      { label: 'Max Peers', value: '1,000+' },
      { label: 'Color Sync', value: 'Dynamic' }
    ],
    accentColor: 'from-cyan-500 to-blue-600',
    mockupType: 'stream'
  },
  {
    id: 'mangahelix',
    title: 'MangaHelix',
    category: 'Vertical Manga Reader',
    description: 'An immersive manga reading application with intelligent image preloading, smart dark-mode optimization, and vertical/webtoon scrolling layout.',
    longDescription: 'MangaHelix is a webtoon-style vertical reading platform built to deliver ultra-smooth page transitions and lightning-fast loading speeds. By implementing an intersection-observer preloader, the application caches upcoming chapters in the background. It also includes an auto-centering focal magnifier, adaptive night-vision filters to protect your eyes during late-night reading sessions, and cloud-synced chapter bookmarks.',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Intersection Observer', 'Local Storage'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    demoUrl: '#',
    metrics: [
      { label: 'Preload Speed', value: '0.2s' },
      { label: 'FPS Rate', value: '60 FPS' },
      { label: 'Eye Care', value: '3 modes' }
    ],
    accentColor: 'from-purple-500 to-pink-600',
    mockupType: 'manga'
  },
  {
    id: 'waifudex',
    title: 'WaifuDex',
    category: 'Interactive Character Index',
    description: 'A beautifully animated anime character archive featuring rich trading-card flipping layouts, smart filter tags, and structural stats comparisons.',
    longDescription: 'WaifuDex brings character directories to life. Built using CSS 3D transforms and Vue transition groups, users can search, sort, and compare details of thousands of popular characters. It features a detailed stats comparison board (comparing popularity, appearance years, power levels), sound bites playbacks, dynamic rating systems, and a fully custom deck-builder which users can share.',
    tags: ['Vue 3', 'Tailwind CSS', 'CSS 3D Transforms', 'Audio API', 'Fuzzy Search'],
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=600&auto=format&fit=crop',
    demoUrl: '#',
    metrics: [
      { label: 'Cards Rendered', value: 'Instant' },
      { label: 'Search Index', value: '15k+ chars' },
      { label: '3D Flipping', value: 'Smooth' }
    ],
    accentColor: 'from-amber-500 to-rose-600',
    mockupType: 'card'
  },
  {
    id: 'nekotrack',
    title: 'NekoTrack',
    category: 'Seasonal Tracker & Calendar',
    description: 'A minimalist seasonal calendar to manage your active watch-lists, featuring automatic release alerts and beautifully styled weekly schedules.',
    longDescription: 'NekoTrack is a gorgeous calendar dashboard designed to untangle your seasonal watch-lists. It organizes airing anime by days of the week, counts down to the exact airing minute, sends custom sound/visual notifications when an episode drops, and provides elegant visual charts of your watch-completion rates. Includes integration structures for third-party lists (MyAnimeList/AniList).',
    tags: ['Vue 3', 'Tailwind CSS', 'Date FNS', 'Custom Charts', 'JSON API'],
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format&fit=crop',
    demoUrl: '#',
    metrics: [
      { label: 'Air Warning', value: '1 min accuracy' },
      { label: 'Syncing APIs', value: 'AniList / MAL' },
      { label: 'Charts', value: 'D3 Powered' }
    ],
    accentColor: 'from-emerald-500 to-teal-600',
    mockupType: 'tracker'
  },
  {
    id: 'jsound',
    title: 'J-Sound',
    category: 'Japanese Lo-Fi Audio Player',
    description: 'An ambient audio portal streaming Japanese lo-fi, anime soundtracks, and customizable white noises with real-time waveform visualization.',
    longDescription: 'J-Sound is an audio sanctuary designed to fuel focus or relaxation sessions. It streams high-quality lo-fi music tracks alongside environmental layers (like Tokyo rain, coffee shop background hums, and trains clicking on rails). The application features a fully interactive custom audio visualizer using the HTML5 Web Audio API and Canvas to render beautiful frequency waveforms.',
    tags: ['Vue 3', 'Web Audio API', 'HTML5 Canvas', 'Tailwind CSS', 'LocalStorage'],
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=600&auto=format&fit=crop',
    demoUrl: '#',
    metrics: [
      { label: 'Audio Quality', value: '320kbps' },
      { label: 'Soundscapes', value: '12 layers' },
      { label: 'Visualizer FPS', value: '60 FPS' }
    ],
    accentColor: 'from-indigo-500 to-purple-600',
    mockupType: 'audio'
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: 'Vue 3 & Composition API', level: 98, rarity: 'SSR', category: 'frontend', rpgStatName: 'Chakra Control', rpgStatValue: 'S-Rank' },
  { name: 'TypeScript', level: 92, rarity: 'SSR', category: 'frontend', rpgStatName: 'Nen Precision', rpgStatValue: 'Master' },
  { name: 'Tailwind CSS & Design Systems', level: 95, rarity: 'SSR', category: 'frontend', rpgStatName: 'Alchemy Transmutation', rpgStatValue: 'Grandmaster' },
  { name: 'Reactive State (Pinia / Vuex)', level: 88, rarity: 'SR', category: 'frontend', rpgStatName: 'Soul Synchrony', rpgStatValue: 'A-Rank' },
  { name: 'Node.js & Express', level: 86, rarity: 'SR', category: 'backend', rpgStatName: 'Mana Infiltration', rpgStatValue: 'Elder' },
  { name: 'PostgreSQL & Firestore', level: 84, rarity: 'SR', category: 'backend', rpgStatName: 'Domain Expansion', rpgStatValue: 'High Tier' },
  { name: 'REST & GraphQL APIs', level: 85, rarity: 'SR', category: 'backend', rpgStatName: 'Cursed Energy Output', rpgStatValue: 'First Grade' },
  { name: 'Vite & Build Tooling', level: 90, rarity: 'SR', category: 'tools', rpgStatName: 'Blade Sharpness', rpgStatValue: 'Murasame Level' },
  { name: 'Git & GitHub Workflows', level: 88, rarity: 'SR', category: 'tools', rpgStatName: 'Sharingankeye', rpgStatValue: '3-Tomoe' },
  { name: 'Docker & Containerization', level: 75, rarity: 'R', category: 'tools', rpgStatName: 'Shadow Clone Capacity', rpgStatValue: 'B-Rank' }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    character: 'Goku',
    anime: 'Dragon Ball Super',
    quote: 'The page loading speed of Shoeb\'s anime streaming app is insane! It fired up faster than my Instant Transmission. This portfolio is over 9,000!',
    avatar: 'https://images.unsplash.com/photo-1601856389534-916b4c122b24?q=80&w=150&auto=format&fit=crop',
    relation: 'Universal Combat Legend / Satisfied Watcher'
  },
  {
    character: 'Levi Ackerman',
    anime: 'Attack on Titan',
    quote: 'No messy scripts. No useless styling. This code is clean, precise, and executed without a single waste of movement. I approve.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    relation: 'Special Operations Squad Captain'
  },
  {
    character: 'Sailor Moon',
    anime: 'Sailor Moon',
    quote: 'Oh my goodness, the interactive WaifuDex cards are so beautiful! They glitter and glow like celestial cosmic starlight. In the name of the Moon, I love it!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    relation: 'Champion of Love and Justice'
  },
  {
    character: 'L Lawliet',
    anime: 'Death Note',
    quote: 'The probability of finding an engineer who writes Vue code with this level of visual and structural precision is approximately 0.003%. A fascinating architecture.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    relation: 'Elite Detective Advisor'
  }
];

export interface CuratedAnime {
  id: string;
  title: string;
  jpTitle: string;
  genre: string[];
  mood: string[];
  synopsis: string;
  image: string;
  rating: number;
  stats: {
    aesthetic: number;
    story: number;
    hype: number;
    feels: number;
  };
}

export const CURATED_ANIME_LIST: CuratedAnime[] = [
  {
    id: 'cyberpunk',
    title: 'Cyberpunk: Edgerunners',
    jpTitle: 'サイバーパンク エッジランナーズ',
    genre: ['Sci-Fi', 'Action'],
    mood: ['Hype', 'Tearjerker'],
    synopsis: 'A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    rating: 9.2,
    stats: { aesthetic: 98, story: 88, hype: 99, feels: 94 }
  },
  {
    id: 'frieren',
    title: 'Frieren: Beyond Journey\'s End',
    jpTitle: '葬送のフリーレン',
    genre: ['Fantasy', 'Slice of Life'],
    mood: ['Chill', 'Tearjerker'],
    synopsis: 'An elf mage and her former party members’ journey after defeating the Demon King, exploring the meaning of human relationships, fleeting time, and grief.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    rating: 9.6,
    stats: { aesthetic: 96, story: 97, hype: 82, feels: 98 }
  },
  {
    id: 'demon_slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    jpTitle: '鬼滅の刃',
    genre: ['Action', 'Fantasy'],
    mood: ['Hype', 'Tearjerker'],
    synopsis: 'A kindhearted boy, Tanjiro Kamado, embarks on a quest to become a demon slayer after his family is slaughtered, aiming to turn his demonized sister Nezuko back into a human.',
    image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=600&auto=format&fit=crop',
    rating: 9.0,
    stats: { aesthetic: 99, story: 80, hype: 98, feels: 87 }
  },
  {
    id: 'kaguya',
    title: 'Kaguya-sama: Love is War',
    jpTitle: 'かぐや様は告らせたい',
    genre: ['Romance', 'Slice of Life'],
    mood: ['Chill', 'Hype'],
    synopsis: 'At a prestigious academy, the student council president and vice president are in love, but are too proud to confess. Thus, an intense battle of romantic mind games begins.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    rating: 8.9,
    stats: { aesthetic: 90, story: 88, hype: 91, feels: 84 }
  },
  {
    id: 'eva',
    title: 'Neon Genesis Evangelion',
    jpTitle: '新世紀エヴァンゲリオン',
    genre: ['Sci-Fi', 'Action'],
    mood: ['Mind-bending', 'Tearjerker'],
    synopsis: 'Teenagers pilot giant bio-mechanical robots called Evangelions to defend humanity against terrifying alien invaders called Angels, leading to deep psychological conflicts.',
    image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?q=80&w=600&auto=format&fit=crop',
    rating: 9.3,
    stats: { aesthetic: 92, story: 96, hype: 94, feels: 95 }
  },
  {
    id: 'laidback_camp',
    title: 'Laid-Back Camp',
    jpTitle: 'ゆるキャン△',
    genre: ['Slice of Life'],
    mood: ['Chill'],
    synopsis: 'A heartwarming story about high school girls who love camping across Japan’s scenic spots, enjoying cozy campfires, warm food, and serene mountaintops.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=600&auto=format&fit=crop',
    rating: 8.7,
    stats: { aesthetic: 94, story: 82, hype: 45, feels: 88 }
  },
  {
    id: 'steins_gate',
    title: 'Steins;Gate',
    jpTitle: 'シュタインズ・ゲート',
    genre: ['Sci-Fi'],
    mood: ['Mind-bending', 'Hype', 'Tearjerker'],
    synopsis: 'A self-proclaimed eccentric scientist accidentally invents a microwave device that can send text messages to the past, triggering unforeseen butterfly effects across timelines.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    rating: 9.6,
    stats: { aesthetic: 89, story: 99, hype: 96, feels: 97 }
  },
  {
    id: 'bocchi',
    title: 'Bocchi the Rock!',
    jpTitle: 'ぼっち・ざ・ろっく！',
    genre: ['Slice of Life', 'Romance'], // Romance isn't main, let's categorize to capture matches
    mood: ['Chill', 'Hype'],
    synopsis: 'Hitori Gotoh is a lonely, extremely introverted girl who loves playing the guitar. Her life changes when she is invited to join the Kessoku Band.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
    rating: 9.1,
    stats: { aesthetic: 97, story: 89, hype: 94, feels: 86 }
  }
];
