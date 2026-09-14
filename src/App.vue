<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import {
  Sparkles,
  Layers,
  Terminal,
  Cpu,
  Tv,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Search,
  CheckCircle,
  Play,
  Pause,
  Heart,
  Volume2,
  Calendar,
  BookOpen,
  Send,
  Eye,
  Sliders,
  Award,
  Zap,
  Flame,
  Shield,
  Compass,
  ArrowRight,
  RefreshCw,
  X,
  Code,
  User,
  HeartHandshake
} from 'lucide-vue-next';
import {
  PROJECTS_DATA,
  SKILLS_DATA,
  TESTIMONIALS_DATA,
  CURATED_ANIME_LIST,
  type Project,
  type Skill,
  type Testimonial,
  type CuratedAnime
} from './data';

// Navigation & Tab State
const activeSection = ref('home');
const isNavbarScrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    isNavbarScrolled.value = window.scrollY > 50;
    
    // Simple intersection detection for active tab
    const sections = ['home', 'projects', 'playground', 'skills', 'testimonials', 'contact'];
    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          activeSection.value = sec;
          break;
        }
      }
    }
  });
});

const scrollToSection = (id: string) => {
  activeSection.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Developer Info
const devStatus = ref({
  status: 'OPEN FOR GIGS',
  currProject: 'MangaHelix V2',
  location: 'Tokyo/Global',
});

// Project Showcase & Drawer/Modal State
const selectedProject = ref<Project | null>(null);
const isProjectDrawerOpen = ref(false);

const openProjectDetail = (project: Project) => {
  selectedProject.value = project;
  isProjectDrawerOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeProjectDetail = () => {
  isProjectDrawerOpen.value = false;
  document.body.style.overflow = '';
};

// --- INTERACTIVE DEMO PROTOTYPE STATES ---

// 1. AniStream Watch Party Demo
const isStreamPlaying = ref(false);
const streamVolume = ref(80);
const streamMessages = ref([
  { user: 'Rem_Simp', text: 'Subaru is looking amazing this season!', color: 'text-rose-400' },
  { user: 'GamerOtaku', text: 'Wait, did you see that animation frame?? Epic!', color: 'text-cyan-400' },
  { user: 'KuroDev', text: 'Vite & Vue 3 keeps this sync within 10ms guys!', color: 'text-violet-400' }
]);
const newChatMessage = ref('');
const streamFloatingReactions = ref<{ id: number; icon: string; style: string }[]>([]);
let reactionIdCounter = 0;

const sendStreamChatMessage = () => {
  if (!newChatMessage.value.trim()) return;
  streamMessages.value.push({
    user: 'GuestOtaku',
    text: newChatMessage.value.trim(),
    color: 'text-emerald-400'
  });
  newChatMessage.value = '';
  // Scroll chat down
  setTimeout(() => {
    const chatEl = document.getElementById('demo-chat-box');
    if (chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }, 50);
};

const triggerStreamReaction = (emoji: string) => {
  const id = reactionIdCounter++;
  const randomX = Math.floor(Math.random() * 80) + 10; // percentage from left
  const style = `left: ${randomX}%; animation: floatUp 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;`;
  
  streamFloatingReactions.value.push({ id, icon: emoji, style });
  
  setTimeout(() => {
    streamFloatingReactions.value = streamFloatingReactions.value.filter(r => r.id !== id);
  }, 1500);
};

// 2. MangaHelix Reader Demo
const mangaReaderMode = ref<'light' | 'sepia' | 'dark'>('dark');
const mangaScale = ref(100);
const mangaChapterProgress = ref(45);

// 3. WaifuDex Card Flip Demo
const flippedCardIndex = ref<number | null>(null);
const dexCards = ref([
  {
    name: 'Nezuko Kamado',
    anime: 'Demon Slayer',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=200&auto=format&fit=crop',
    stats: { Hype: 'SS', Cute: 'SSS', Power: 'S', Speed: 'S' },
    bio: 'Turned into a demon by Muzan Kibutsuji, she retains her human feelings and fights alongside her brother Tanjiro to protect humanity.'
  },
  {
    name: 'Frieren',
    anime: "Beyond Journey's End",
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=200&auto=format&fit=crop',
    stats: { Magic: 'SSS', Calm: 'SSS', History: 'SS', Speed: 'A' },
    bio: 'An elven mage who was a member of the party that defeated the Demon King. She lives an incredibly long life and travels to understand human hearts.'
  },
  {
    name: 'Lain Iwakura',
    anime: 'Serial Experiments Lain',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=200&auto=format&fit=crop',
    stats: { Wired: 'SSS', Mystery: 'SSS', Tech: 'SS', Combat: 'C' },
    bio: 'An introverted junior high school girl living in suburban Japan who discovers the Wired, a global virtual communications network.'
  }
]);

// 4. NekoTrack Calendar Air Tracker Demo
const trackedAnimeList = ref([
  { day: 'Mon', title: 'Chainsaw Man S2', progress: 8, total: 12, watched: true, time: '23:30' },
  { day: 'Wed', title: 'Re:Zero Season 3', progress: 3, total: 16, watched: false, time: '22:00' },
  { day: 'Thu', title: 'Kaiju No. 8', progress: 12, total: 12, watched: true, time: '23:00' },
  { day: 'Fri', title: 'Oshi No Ko S2', progress: 11, total: 13, watched: true, time: '21:30' },
  { day: 'Sat', title: 'Solo Leveling S2', progress: 4, total: 12, watched: false, time: '22:30' }
]);

const toggleTrackedAnime = (index: number) => {
  const anime = trackedAnimeList.value[index];
  if (anime.watched) {
    if (anime.progress > 0) anime.progress--;
    anime.watched = false;
  } else {
    if (anime.progress < anime.total) anime.progress++;
    if (anime.progress === anime.total) anime.watched = true;
  }
};

const incrementTrackedEpisode = (index: number) => {
  const anime = trackedAnimeList.value[index];
  if (anime.progress < anime.total) {
    anime.progress++;
    if (anime.progress === anime.total) {
      anime.watched = true;
    }
  }
};

const totalTrackProgress = computed(() => {
  let completed = 0;
  let total = 0;
  trackedAnimeList.value.forEach(a => {
    completed += a.progress;
    total += a.total;
  });
  return Math.round((completed / total) * 100);
});

// 5. J-Sound Audio Visualizer Demo
const isAudioPlaying = ref(false);
const activeTrackIdx = ref(0);
const environmentalRain = ref(50);
const environmentalCafe = ref(20);
const audioTracks = [
  { name: 'Shibuya Neon Rain', bpm: '72 BPM', composer: 'Lofi Otaku' },
  { name: 'Sakura Petals Drifting', bpm: '65 BPM', composer: 'KuroDev Chill' },
  { name: 'Akihabara Station 3 AM', bpm: '80 BPM', composer: 'Subway Beats' }
];

// --- ANIME MATCH & TRADING CARD GENERATOR STATES ---

const quizStep = ref(1); // 1: Welcome, 2: Genre, 3: Mood, 4: Customizer, 5: Complete Card
const quizSelections = ref({
  genre: '',
  mood: '',
  customName: '',
  cardStyle: 'cyber-cyan' // cyber-cyan, sakura-pink, neon-green, solar-orange
});

const activeMatch = ref<CuratedAnime | null>(null);

const selectGenre = (genre: string) => {
  quizSelections.value.genre = genre;
  quizStep.value = 3;
};

const selectMood = (mood: string) => {
  quizSelections.value.mood = mood;
  
  // Find a matching anime from CURATED_ANIME_LIST
  const matchingAnime = CURATED_ANIME_LIST.find(anime => {
    const hasGenre = anime.genre.includes(quizSelections.value.genre);
    const hasMood = anime.mood.includes(mood);
    return hasGenre && hasMood;
  }) || CURATED_ANIME_LIST[0]; // fallback
  
  activeMatch.value = matchingAnime;
  quizStep.value = 4;
};

const finishCardCustomization = () => {
  if (!quizSelections.value.customName.trim()) {
    quizSelections.value.customName = 'Elite Otaku';
  }
  quizStep.value = 5;
};

const resetCardQuiz = () => {
  quizStep.value = 1;
  quizSelections.value.genre = '';
  quizSelections.value.mood = '';
  quizSelections.value.customName = '';
  quizSelections.value.cardStyle = 'cyber-cyan';
  activeMatch.value = null;
};

const cardThemeClasses = computed(() => {
  switch (quizSelections.value.cardStyle) {
    case 'sakura-pink':
      return {
        border: 'border-pink-500/50 shadow-pink-500/20 text-pink-400',
        bg: 'from-pink-950/40 to-slate-950/90',
        glow: 'shadow-[0_0_20px_rgba(244,114,182,0.3)]',
        badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
        textAccent: 'text-pink-400',
        accentGlow: 'bg-pink-500'
      };
    case 'neon-green':
      return {
        border: 'border-emerald-500/50 shadow-emerald-500/20 text-emerald-400',
        bg: 'from-emerald-950/40 to-slate-950/90',
        glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        textAccent: 'text-emerald-400',
        accentGlow: 'bg-emerald-500'
      };
    case 'solar-orange':
      return {
        border: 'border-amber-500/50 shadow-amber-500/20 text-amber-400',
        bg: 'from-amber-950/40 to-slate-950/90',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        textAccent: 'text-amber-400',
        accentGlow: 'bg-amber-500'
      };
    case 'cyber-cyan':
    default:
      return {
        border: 'border-cyan-500/50 shadow-cyan-500/20 text-cyan-400',
        bg: 'from-cyan-950/40 to-slate-950/90',
        glow: 'shadow-[0_0_20px_rgba(6,180,212,0.3)]',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        textAccent: 'text-cyan-400',
        accentGlow: 'bg-cyan-500'
      };
  }
});


// --- RPG SKILLS FILTER SYSTEM ---
const activeSkillsFilter = ref<'all' | 'frontend' | 'backend' | 'tools'>('all');

const filteredSkills = computed(() => {
  if (activeSkillsFilter.value === 'all') return SKILLS_DATA;
  return SKILLS_DATA.filter(skill => skill.category === activeSkillsFilter.value);
});


// --- TESTIMONIAL CAROUSEL STATE ---
const activeTestimonialIdx = ref(0);

const nextTestimonial = () => {
  activeTestimonialIdx.value = (activeTestimonialIdx.value + 1) % TESTIMONIALS_DATA.length;
};

const prevTestimonial = () => {
  activeTestimonialIdx.value = (activeTestimonialIdx.value - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
};


// --- TERMINAL CONTACT FORM STATE ---
const formSenderName = ref('');
const formSenderEmail = ref('');
const formMessageSubject = ref('Anime Site Project Query');
const formMessageText = ref('');
const formConsoleLogs = ref<string[]>([]);
const isFormSubmitting = ref(false);
const isFormSuccess = ref(false);

const appendLogLine = (msg: string, delay: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      formConsoleLogs.value.push(msg);
      resolve();
    }, delay);
  });
};

const submitContactForm = async () => {
  if (!formSenderName.value || !formSenderEmail.value || !formMessageText.value) {
    alert('Please fill out all terminal entry matrices (Name, Email, Message).');
    return;
  }
  
  isFormSubmitting.value = true;
  formConsoleLogs.value = [];
  
  await appendLogLine('>> INIT_POST_ROUTE: Connecting to KuroDev mail gateway...', 300);
  await appendLogLine(`>> INGEST_DATA: Parsing packet payload from "${formSenderName.value}"...`, 400);
  await appendLogLine(`>> PARSING_EMAIL: Verifying routing to <${formSenderEmail.value}>`, 300);
  await appendLogLine('>> SCANNING_PAYLOAD: Executing anti-curse spell validation... [SAFE]', 500);
  await appendLogLine('>> COMPILING: Transmuting message parameters via Vue 3 & Express API...', 400);
  await appendLogLine('>> POST_SUCCESS: Server accepted mail packet [id: kd-99120]', 500);
  await appendLogLine('>> SYSTEM_MESSAGE: "I will respond to you within one business day. Arigatou!"', 300);
  
  isFormSubmitting.value = false;
  isFormSuccess.value = true;
};

const resetContactForm = () => {
  formSenderName.value = '';
  formSenderEmail.value = '';
  formMessageText.value = '';
  formConsoleLogs.value = [];
  isFormSuccess.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-[#FFF9FB] text-slate-800 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden relative">
    
    <!-- TOP NOTCH GLOWS (Static visual gradients for ambient lighting) -->
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-200/30 rounded-full blur-[150px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[180px] pointer-events-none"></div>

    <!-- GLOWING TOP BANNER BADGE -->
    <div class="bg-white/80 backdrop-blur-md border-b border-rose-100/60 text-xs py-2 px-4 flex justify-between items-center z-50 relative text-slate-600">
      <div class="flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <span class="font-mono tracking-wider uppercase text-slate-500">System Protocol: Active</span>
      </div>
      <div class="flex items-center gap-4 font-mono text-[11px] sm:flex hidden">
        <span>STAGED: <strong class="text-rose-500 font-semibold">VUE 3 & TAILWIND</strong></span>
        <span class="text-slate-200">|</span>
        <span>CURRENT GIG STATUS: <strong class="text-indigo-600 font-semibold">{{ devStatus.status }}</strong></span>
        <span class="text-slate-200">|</span>
        <span>BUILDING: <strong class="text-pink-500 font-semibold">{{ devStatus.currProject }}</strong></span>
      </div>
    </div>

    <!-- MAIN NAVBAR -->
    <nav 
      class="sticky top-0 z-40 transition-all duration-300 border-b"
      :class="isNavbarScrolled ? 'bg-white/90 backdrop-blur-md py-3 border-rose-100/60 shadow-lg shadow-rose-950/5' : 'bg-transparent py-5 border-transparent'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <!-- Logo -->
        <a href="#" @click.prevent="scrollToSection('home')" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center font-bold tracking-tight text-white shadow-[0_4px_14px_rgba(244,63,94,0.3)] group-hover:scale-105 transition-transform duration-300">
            K
          </div>
          <span class="text-xl font-bold font-sans tracking-tight text-slate-800 group-hover:text-rose-500 transition-colors duration-300">
            KURO<span class="text-rose-500">//</span>DEV
          </span>
        </a>

        <!-- Desktop Navigation Items -->
        <div class="hidden md:flex items-center gap-1.5 bg-white/80 p-1 rounded-full border border-rose-100/40 backdrop-blur-sm shadow-sm">
          <button 
            v-for="item in [
              { id: 'home', label: 'Home' },
              { id: 'projects', label: 'Projects' },
              { id: 'playground', label: 'Playground' },
              { id: 'skills', label: 'Otaku Stats' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ]" 
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer"
            :class="activeSection === item.id 
              ? 'bg-gradient-to-r from-rose-500 to-indigo-500 text-white shadow-md shadow-rose-500/25 font-semibold' 
              : 'text-slate-600 hover:text-slate-950 hover:bg-rose-50/50'"
          >
            {{ item.label }}
          </button>
        </div>

        <!-- Call To Action Button -->
        <button 
          @click="scrollToSection('contact')"
          class="hidden sm:flex items-center gap-2 px-4.5 py-2 rounded-xl border border-rose-200 bg-rose-50/50 text-xs font-semibold tracking-wider uppercase text-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-[0_4px_14px_rgba(244,63,94,0.3)] transition-all duration-300 cursor-pointer"
        >
          <span>Enlist Me</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>

    <!-- HERO SECTION (Aesthetic displays & Intro) -->
    <section id="home" class="relative pt-12 pb-24 md:pt-20 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text details -->
        <div class="lg:col-span-7 flex flex-col items-start gap-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono shadow-sm">
            <Sparkles class="w-3.5 h-3.5 animate-spin text-rose-500" style="animation-duration: 4s" />
            <span>Frontend Sorcerer // Anime Specialist</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-rose-500 to-indigo-600 leading-tight font-display">
            Immersive Digital <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600">Experiences</span> for Otakus
          </h1>

          <p class="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Hi, I am <strong class="text-slate-900">Shoeb (KuroDev)</strong>. I engineer sleek, high-fidelity web ecosystems specializing in seasonal trackers, fluid vertical reader platforms, zero-latency streaming mockups, and highly interactive fan card systems built on top of 
            <span class="text-rose-500 font-semibold font-mono">Vue 3</span> and 
            <span class="text-indigo-600 font-semibold font-mono">Tailwind CSS</span>.
          </p>

          <div class="flex flex-wrap gap-4 mt-2">
            <button 
              @click="scrollToSection('projects')"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-bold tracking-wider text-sm shadow-[0_4px_20px_rgba(244,63,94,0.25)] hover:shadow-[0_4px_30px_rgba(244,63,94,0.4)] hover:scale-102 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Blueprints</span>
              <ChevronRight class="w-4 h-4" />
            </button>
            <button 
              @click="scrollToSection('playground')"
              class="px-6 py-3 rounded-xl bg-white border border-rose-100 text-slate-700 font-bold tracking-wider text-sm hover:text-rose-600 hover:bg-rose-50/50 hover:border-rose-200 transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Zap class="w-4 h-4 text-amber-500" />
              <span>Anime Card Matcher</span>
            </button>
          </div>

          <!-- Mini Counters / Badges -->
          <div class="grid grid-cols-3 gap-8 mt-6 pt-8 border-t border-rose-100/60 w-full max-w-lg">
            <div class="flex flex-col">
              <span class="text-3xl font-extrabold text-rose-500 font-mono">15+</span>
              <span class="text-xs text-slate-400 uppercase tracking-wider mt-1">Anime Portals</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-extrabold text-indigo-600 font-mono">99.8%</span>
              <span class="text-xs text-slate-400 uppercase tracking-wider mt-1">Hype Index</span>
            </div>
            <div class="flex flex-col">
              <span class="text-3xl font-extrabold text-pink-500 font-mono">SSR</span>
              <span class="text-xs text-slate-400 uppercase tracking-wider mt-1">Dev Rarity</span>
            </div>
          </div>
        </div>

        <!-- Visual Terminal Mockup -->
        <div class="lg:col-span-5 relative w-full flex justify-center">
          <div class="absolute inset-0 bg-gradient-to-tr from-rose-500/15 to-indigo-500/15 rounded-3xl blur-2xl pointer-events-none"></div>
          
          <!-- Tactile HUD Card -->
          <div class="relative w-full max-w-md bg-white/90 border border-white/60 rounded-[32px] p-6 shadow-2xl shadow-rose-950/5 backdrop-blur-md">
            <!-- Header bar -->
            <div class="flex items-center justify-between border-b border-rose-100/40 pb-3 mb-4">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <div class="text-[10px] text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5">
                <Terminal class="w-3.5 h-3.5 text-rose-500" />
                <span>kuro-hud-card.sys</span>
              </div>
            </div>

            <!-- Developer Status Sheet (Anime style RPG character status) -->
            <div class="space-y-4">
              <div class="flex items-center gap-4 bg-rose-50/50 p-3 rounded-2xl border border-rose-100/50">
                <div class="relative">
                  <div class="w-14 h-14 rounded-xl overflow-hidden border-2 border-rose-500 bg-slate-100 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop" 
                      alt="Avatar representation"
                      class="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span class="absolute -bottom-1 -right-1 bg-rose-500 text-[9px] font-mono font-bold px-1 rounded border border-white text-white">SSR</span>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-slate-850 tracking-wide uppercase flex items-center gap-1.5">
                    <span>Shoeb Sikder</span>
                  </h4>
                  <p class="text-xs text-rose-500 font-mono mt-0.5">Lv. 99 Front-End Mage</p>
                </div>
              </div>

              <!-- RPG Gauge Stats -->
              <div class="space-y-2 text-xs font-mono">
                <div class="flex justify-between text-slate-600 text-[11px] mb-1">
                  <span>CHAKRA LEVEL (VUE & WEB APIS)</span>
                  <span class="text-rose-500 font-bold">98/100</span>
                </div>
                <div class="h-1.5 bg-rose-50 rounded-full overflow-hidden p-[1px] border border-rose-100">
                  <div class="h-full bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.3)]" style="width: 98%"></div>
                </div>

                <div class="flex justify-between text-slate-600 text-[11px] mt-2 mb-1">
                  <span>NEN SYNCHRONY (TYPESCRIPT SYSTEM)</span>
                  <span class="text-indigo-600 font-bold">92/100</span>
                </div>
                <div class="h-1.5 bg-rose-50 rounded-full overflow-hidden p-[1px] border border-rose-100">
                  <div class="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]" style="width: 92%"></div>
                </div>

                <div class="flex justify-between text-slate-600 text-[11px] mt-2 mb-1">
                  <span>REACTION FLUIDITY (MOTION STYLING)</span>
                  <span class="text-pink-500 font-bold">95/100</span>
                </div>
                <div class="h-1.5 bg-rose-50 rounded-full overflow-hidden p-[1px] border border-rose-100">
                  <div class="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.3)]" style="width: 95%"></div>
                </div>
              </div>

              <!-- Special attributes tags -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-rose-100/60 text-[10px] font-mono text-slate-600">
                <span class="bg-white/60 px-2 py-1 rounded-lg border border-rose-100">Class: Mage</span>
                <span class="bg-white/60 px-2 py-1 rounded-lg border border-rose-100">Familiar: Vue3</span>
                <span class="bg-white/60 px-2 py-1 rounded-lg border border-rose-100">Speed: 60fps</span>
                <span class="bg-rose-50 px-2 py-1 rounded-lg border border-rose-100 text-rose-600 font-bold">Status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLUEPRINT / FEATURED PROJECTS SECTION -->
    <section id="projects" class="bg-[#FFF9FB]/30 border-t border-rose-100/50 py-24 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header text -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono mb-4 shadow-sm">
            <Layers class="w-3.5 h-3.5" />
            <span>Interactive Blueprints</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Crafted Anime <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">Engines</span>
          </h2>
          <p class="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Click on any project card below to unpack its technical documentation and launch a 
            <strong class="text-slate-800">live interactive prototype demo</strong> right inside your browser window. No mockup mocks!
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in PROJECTS_DATA" 
            :key="project.id"
            class="group bg-white border border-rose-100 rounded-[32px] overflow-hidden hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-300 flex flex-col cursor-pointer"
            @click="openProjectDetail(project)"
          >
            <!-- Image Frame -->
            <div class="relative h-48 overflow-hidden bg-rose-50">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="object-cover w-full h-full group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              
              <!-- Badges -->
              <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-rose-600 border border-rose-100 text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded-xl shadow-sm">
                {{ project.category }}
              </span>
            </div>

            <!-- Body Contents -->
            <div class="p-6 flex-1 flex flex-col justify-between gap-5">
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-850 group-hover:text-rose-500 transition-colors duration-300 flex items-center justify-between font-display">
                  <span>{{ project.title }}</span>
                  <ChevronRight class="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all duration-300" />
                </h3>
                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Tech Stacks -->
              <div class="space-y-4">
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    v-for="tag in project.tags.slice(0, 3)" 
                    :key="tag" 
                    class="bg-rose-50 text-rose-600 text-[9px] font-mono px-2.5 py-1 rounded-lg border border-rose-100/50"
                  >
                    {{ tag }}
                  </span>
                  <span v-if="project.tags.length > 3" class="text-[9px] text-slate-400 font-mono px-1">
                    +{{ project.tags.length - 3 }} more
                  </span>
                </div>

                <div class="pt-4 border-t border-rose-100/50 flex justify-between items-center text-xs text-rose-500 font-bold font-mono group-hover:text-indigo-600 transition-colors duration-300">
                  <span>Launch Live Matrix Demo</span>
                  <Tv class="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE DETAIL DRAWER MODAL -->
    <div 
      v-if="isProjectDrawerOpen && selectedProject" 
      class="fixed inset-0 z-50 overflow-hidden flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop overlay -->
      <div 
        class="absolute inset-0 bg-rose-950/45 backdrop-blur-sm transition-opacity"
        @click="closeProjectDetail"
      ></div>

      <!-- Drawer Panel Content -->
      <div class="relative w-full max-w-2xl bg-[#FFF9FB] border-l border-rose-100 shadow-2xl h-full flex flex-col justify-between overflow-y-auto text-slate-800">
        <!-- Close button & Title -->
        <div class="p-5 border-b border-rose-100 bg-white/80 flex justify-between items-center sticky top-0 backdrop-blur-md z-10">
          <div class="flex items-center gap-2">
            <span class="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20">
              <Layers class="w-4 h-4" />
            </span>
            <div>
              <h3 class="text-base font-bold text-slate-850 flex items-center gap-1.5">
                <span>{{ selectedProject.title }}</span>
                <span class="text-xs text-slate-400 font-mono font-normal">Blueprint</span>
              </h3>
            </div>
          </div>
          <button 
            @click="closeProjectDetail"
            class="p-1.5 rounded-lg border border-rose-100 hover:bg-rose-500 text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Body Contents -->
        <div class="p-6 flex-1 space-y-8 overflow-y-auto">
          <!-- Banner Image & Metrics -->
          <div class="space-y-4">
            <div class="h-44 rounded-xl overflow-hidden bg-rose-50 border border-rose-100">
              <img 
                :src="selectedProject.image" 
                :alt="selectedProject.title"
                class="object-cover w-full h-full brightness-95"
                referrerPolicy="no-referrer"
              />
            </div>

            <!-- Key metrics row -->
            <div class="grid grid-cols-3 gap-4">
              <div 
                v-for="metric in selectedProject.metrics" 
                :key="metric.label"
                class="bg-white p-3 rounded-2xl border border-rose-100 text-center font-mono shadow-sm"
              >
                <div class="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">{{ metric.label }}</div>
                <div class="text-xs font-extrabold text-rose-500 mt-0.5">{{ metric.value }}</div>
              </div>
            </div>
          </div>

          <!-- Documentation Segment -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">System Summary</h4>
            <p class="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-rose-100 shadow-sm">
              {{ selectedProject.longDescription }}
            </p>
          </div>

          <!-- Core Stack Tagging -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Module Dependencies</h4>
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="tag in selectedProject.tags" 
                :key="tag" 
                class="bg-rose-50 text-xs text-rose-600 font-mono px-3 py-1 rounded-xl border border-rose-100/50 shadow-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- --- LIVE DEMO CORE INTERACTIVE SCREEN --- -->
          <div class="space-y-3 border-t border-rose-100 pt-6">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-pink-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Tv class="w-4 h-4" />
                <span>Live Active Prototype</span>
              </h4>
              <span class="text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100/60">SANDBOX SIMULATOR</span>
            </div>

            <div class="bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-xl">
              <!-- 1. AniStream Watch Party Demo -->
              <div v-if="selectedProject.mockupType === 'stream'" class="p-4 space-y-4">
                <!-- Video Simulator frame -->
                <div class="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-850 flex flex-col justify-between p-3">
                  <!-- Floating reactions splash canvas -->
                  <div class="absolute inset-x-0 bottom-12 h-24 overflow-hidden pointer-events-none z-10">
                    <span 
                      v-for="reaction in streamFloatingReactions" 
                      :key="reaction.id"
                      class="absolute text-2xl"
                      :style="reaction.style"
                    >
                      {{ reaction.icon }}
                    </span>
                  </div>

                  <!-- Status bar -->
                  <div class="flex justify-between items-center z-10">
                    <span class="bg-rose-500 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded text-white animate-pulse">LIVE WATCH PARTY</span>
                    <span class="text-[10px] font-mono text-slate-300">1,245 Otakus Syncing</span>
                  </div>

                  <!-- Central play button overlay -->
                  <div class="flex justify-center items-center h-20 z-10">
                    <button 
                      @click="isStreamPlaying = !isStreamPlaying"
                      class="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Play v-if="!isStreamPlaying" class="w-5 h-5 fill-current ml-0.5" />
                      <Pause v-else class="w-5 h-5 fill-current" />
                    </button>
                  </div>

                  <!-- Mini control bar -->
                  <div class="flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/80 p-2 rounded z-10">
                    <span class="text-rose-400 font-bold">EPISODE 12 [FINALE]</span>
                    <div class="flex items-center gap-2">
                      <Volume2 class="w-3.5 h-3.5 text-slate-400" />
                      <input type="range" v-model="streamVolume" min="0" max="100" class="w-16 accent-rose-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>
                  
                  <!-- Pulsing dynamic ambient backlight -->
                  <div 
                    class="absolute inset-0 bg-rose-500/10 transition-opacity duration-1000 pointer-events-none"
                    :class="isStreamPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'"
                  ></div>
                </div>

                <!-- Live Chat & Quick Reaction Panel -->
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 font-sans">
                  <!-- Emotes selector -->
                  <div class="sm:col-span-4 flex flex-col justify-between bg-rose-50/50 p-2.5 rounded-xl border border-rose-100/60">
                    <span class="text-[9px] text-slate-500 font-mono uppercase tracking-wider mb-2 font-semibold">Splashes Emotes</span>
                    <div class="grid grid-cols-3 gap-1">
                      <button 
                        v-for="emote in ['🔥', '🎉', '❤️', '😮', '👑', '🌸']" 
                        :key="emote"
                        @click="triggerStreamReaction(emote)"
                        class="p-1.5 bg-white hover:bg-rose-50 rounded-lg text-base active:scale-90 transition-all border border-rose-100 cursor-pointer"
                        title="Click to splash reaction!"
                      >
                        {{ emote }}
                      </button>
                    </div>
                  </div>

                  <!-- Chat messages list -->
                  <div class="sm:col-span-8 flex flex-col justify-between h-40 bg-rose-50/50 rounded-xl border border-rose-100/60 p-2.5">
                    <div id="demo-chat-box" class="flex-1 overflow-y-auto space-y-1.5 text-[11px] font-mono max-h-24 pr-1">
                      <div v-for="(msg, i) in streamMessages" :key="i">
                        <span :class="msg.color" class="font-bold">@{{ msg.user }}:</span>
                        <span class="text-slate-600 ml-1.5 font-sans">{{ msg.text }}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5 mt-2 pt-2 border-t border-rose-100/50">
                      <input 
                        type="text" 
                        v-model="newChatMessage"
                        @keyup.enter="sendStreamChatMessage"
                        placeholder="Say something to watch-party..." 
                        class="flex-1 bg-white border border-rose-100 text-[11px] rounded-lg px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500/50"
                      />
                      <button 
                        @click="sendStreamChatMessage"
                        class="p-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white active:scale-95 transition-all cursor-pointer"
                      >
                        <Send class="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. MangaHelix Reader Demo -->
              <div v-if="selectedProject.mockupType === 'manga'" class="p-4 space-y-4 font-mono text-[11px]">
                <!-- Reader Config Controls -->
                <div class="flex justify-between items-center border-b border-rose-100 pb-3">
                  <div class="flex gap-1">
                    <button 
                      v-for="mode in ['light', 'sepia', 'dark']" 
                      :key="mode"
                      @click="mangaReaderMode = mode as any"
                      class="px-2.5 py-1 text-[10px] rounded uppercase font-semibold border cursor-pointer"
                      :class="mangaReaderMode === mode 
                        ? 'bg-rose-500 text-white border-rose-400 font-bold' 
                        : 'bg-white text-slate-600 border-rose-100 hover:bg-rose-50/50'"
                    >
                      {{ mode }}
                    </button>
                  </div>
                  <div class="flex items-center gap-2 text-slate-500">
                    <Sliders class="w-3.5 h-3.5 text-rose-500" />
                    <span>ZOOM:</span>
                    <input type="range" v-model="mangaScale" min="60" max="140" class="w-16 accent-rose-500 h-1 bg-rose-100 rounded-lg cursor-pointer" />
                    <span>{{ mangaScale }}%</span>
                  </div>
                </div>

                <!-- Vertical Scroller Viewport -->
                <div class="h-56 overflow-y-auto bg-rose-50/30 border border-rose-100 rounded-xl p-4 space-y-4 relative scroll-smooth">
                  <div 
                    class="mx-auto rounded border-2 border-dashed border-rose-200/50 p-4 transition-all duration-300 max-w-sm"
                    :class="[
                      mangaReaderMode === 'light' ? 'bg-slate-100 text-slate-900 border-slate-300' : '',
                      mangaReaderMode === 'sepia' ? 'bg-amber-100/90 text-amber-950 border-amber-300' : '',
                      mangaReaderMode === 'dark' ? 'bg-slate-950 text-slate-300 border-slate-800' : ''
                    ]"
                    :style="`transform: scale(${mangaScale / 100}); transform-origin: top center;`"
                  >
                    <div class="text-center font-bold border-b border-slate-800/30 pb-2 mb-4 text-[10px] uppercase tracking-widest">
                      MANGA PANEL PRELOAD SIMULATOR
                    </div>
                    <div class="h-32 bg-slate-900/10 rounded flex flex-col justify-between p-3 border border-slate-800/10 mb-4">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500">Panel 01 - Hero Awakes</span>
                      <p class="text-xs italic leading-relaxed text-center text-slate-850">
                        "If you don't fight... you can't win."
                      </p>
                      <div class="text-right text-[8px] text-slate-500 font-mono">Preloaded: Chapter 45, Page 12</div>
                    </div>
                    <div class="h-32 bg-slate-900/10 rounded flex flex-col justify-between p-3 border border-slate-800/10">
                      <span class="text-[9px] uppercase tracking-wider text-slate-500">Panel 02 - The Decisive Blow</span>
                      <p class="text-xs italic leading-relaxed text-center font-bold text-slate-850">
                        *SLASHING SFX INTENSIFIES*
                      </p>
                      <div class="text-right text-[8px] text-slate-500 font-mono">Cached Chapter 46 in Background</div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-rose-100">
                  <span class="flex items-center gap-1">
                    <CheckCircle class="w-3 h-3 text-emerald-500" />
                    <span>Intersection-Observer Active</span>
                  </span>
                  <span>Chapter 45 Progress: {{ mangaChapterProgress }}%</span>
                </div>
              </div>

              <!-- 3. WaifuDex Card Flip Demo -->
              <div v-if="selectedProject.mockupType === 'card'" class="p-4 space-y-4">
                <span class="text-[9px] text-slate-400 font-mono uppercase tracking-wider block mb-2 text-center">Click a Character card to flip (3D Transform)</span>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans h-60">
                  <div 
                    v-for="(card, i) in dexCards" 
                    :key="card.name"
                    class="perspective cursor-pointer h-full relative"
                    @click="flippedCardIndex = flippedCardIndex === i ? null : i"
                  >
                    <!-- Flipping wrapper -->
                    <div 
                      class="relative w-full h-full duration-500 transform-style-3d transition-transform rounded-xl border border-rose-100"
                      :class="flippedCardIndex === i ? 'rotate-y-180 bg-rose-50' : 'bg-white shadow-sm'"
                    >
                      <!-- Front Face -->
                      <div class="absolute inset-0 backface-hidden flex flex-col justify-between p-3">
                        <div class="h-28 rounded-lg overflow-hidden bg-rose-100/50 border border-rose-100">
                          <img 
                            :src="card.image" 
                            :alt="card.name"
                            class="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div class="mt-2 text-center">
                          <h5 class="text-xs font-bold text-slate-800 truncate font-display">{{ card.name }}</h5>
                          <span class="text-[9px] text-rose-500 font-mono uppercase tracking-widest block mt-0.5">{{ card.anime }}</span>
                        </div>
                        <div class="text-[8px] font-mono text-center text-slate-400 mt-2 border-t border-rose-100/60 pt-1">
                          CLICK TO ANALYZE STATS
                        </div>
                      </div>

                      <!-- Back Face -->
                      <div class="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-between p-3 bg-rose-50 rounded-xl">
                        <div class="border-b border-rose-100/60 pb-1.5 mb-2">
                          <h5 class="text-xs font-bold text-rose-600 tracking-wide uppercase font-display">{{ card.name }}</h5>
                        </div>
                        <div class="flex-1 space-y-1.5 text-[10px] font-mono">
                          <div v-for="(val, label) in card.stats" :key="label" class="flex justify-between border-b border-rose-100/40 pb-0.5">
                            <span class="text-slate-400 uppercase text-[9px]">{{ label }}</span>
                            <span class="text-slate-700 font-bold">{{ val }}</span>
                          </div>
                          <p class="text-[9px] text-slate-500 leading-normal mt-2 line-clamp-3 font-sans">
                            {{ card.bio }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 4. NekoTrack Calendar Air Tracker Demo -->
              <div v-if="selectedProject.mockupType === 'tracker'" class="p-4 space-y-4 font-mono text-[11px]">
                <div class="flex items-center justify-between border-b border-rose-100 pb-3 mb-2">
                  <div class="flex items-center gap-1.5 text-slate-750">
                    <Calendar class="w-4 h-4 text-rose-500" />
                    <span class="font-bold">SEASON AIR WATCH LIST</span>
                  </div>
                  <div class="text-right">
                    <span class="text-[10px] text-slate-400 uppercase">Season completion</span>
                    <div class="text-xs font-bold text-rose-500">{{ totalTrackProgress }}%</div>
                  </div>
                </div>

                <!-- Calendar air list -->
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <div 
                    v-for="(anime, i) in trackedAnimeList" 
                    :key="anime.title"
                    class="flex items-center justify-between p-2 rounded-xl bg-white border transition-all shadow-sm"
                    :class="anime.watched ? 'border-rose-200 bg-rose-50/40' : 'border-rose-100'"
                  >
                    <div class="flex items-center gap-2">
                      <span class="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold" :class="anime.watched ? 'bg-rose-500/10 text-rose-600 border border-rose-200' : 'bg-rose-50 text-rose-500 border border-rose-100'">
                        {{ anime.day }}
                      </span>
                      <div class="flex flex-col">
                        <span class="text-xs text-slate-700 font-sans font-bold truncate max-w-[140px]">{{ anime.title }}</span>
                        <span class="text-[9px] text-slate-400">Air Time: {{ anime.time }}</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-3">
                      <div class="flex items-center gap-1.5">
                        <button 
                          @click="toggleTrackedAnime(i)"
                          class="w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer bg-white"
                          :class="anime.watched ? 'bg-rose-500 border-rose-400 text-white' : 'border-rose-200 hover:border-rose-400'"
                        >
                          <span v-if="anime.watched" class="text-[8px] font-bold">✓</span>
                        </button>
                        <span class="text-[10px] text-slate-700 w-11 text-center font-bold bg-rose-50 py-0.5 rounded border border-rose-100">
                          {{ anime.progress }}/{{ anime.total }}
                        </span>
                        <button 
                          @click="incrementTrackedEpisode(i)"
                          class="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white active:scale-90 font-bold cursor-pointer"
                          title="Count next episode watch"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 5. J-Sound Audio Visualizer Demo -->
              <div v-if="selectedProject.mockupType === 'audio'" class="p-4 space-y-4 font-mono text-[11px]">
                <div class="flex items-center gap-3.5 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                  <!-- Custom wave SVG visualizer -->
                  <div class="flex-1 space-y-1">
                    <span class="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">TRACK PLAYING</span>
                    <div class="text-xs font-bold text-rose-600 truncate">{{ audioTracks[activeTrackIdx].name }}</div>
                    <div class="text-[10px] text-slate-500 font-sans">{{ audioTracks[activeTrackIdx].composer }} • {{ audioTracks[activeTrackIdx].bpm }}</div>
                  </div>

                  <!-- Toggle Buttons -->
                  <button 
                    @click="isAudioPlaying = !isAudioPlaying"
                    class="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-rose-500/35 cursor-pointer"
                  >
                    <Play v-if="!isAudioPlaying" class="w-4.5 h-4.5 fill-current ml-0.5" />
                    <Pause v-else class="w-4.5 h-4.5 fill-current" />
                  </button>
                </div>

                <!-- Wave animation canvas -->
                <div class="h-12 bg-rose-50/30 border border-rose-100/60 rounded-xl flex items-center justify-center overflow-hidden p-2">
                  <svg class="w-full h-8" viewBox="0 0 200 40">
                    <path 
                      d="M 0 20 Q 20 20, 40 20 T 80 20 T 120 20 T 160 20 T 200 20" 
                      fill="none" 
                      stroke="#f43f5e" 
                      stroke-width="2"
                      :class="isAudioPlaying ? 'animate-audio-wave' : ''"
                    />
                    <path 
                      d="M 0 20 Q 25 20, 50 20 T 100 20 T 150 20 T 200 20" 
                      fill="none" 
                      stroke="#818cf8" 
                      stroke-width="1"
                      stroke-dasharray="4 2"
                      :class="isAudioPlaying ? 'animate-audio-wave-reverse' : ''"
                    />
                  </svg>
                </div>

                <!-- Custom ambient sliders -->
                <div class="space-y-2.5 pt-2 border-t border-rose-100">
                  <div class="flex justify-between items-center">
                    <span class="text-[9px] text-slate-600 uppercase tracking-wider flex items-center gap-1 font-bold">
                      <span>🗼 TOKYO RAIN FX</span>
                    </span>
                    <input type="range" v-model="environmentalRain" min="0" max="100" class="w-28 accent-rose-500 h-1 bg-rose-100 rounded" />
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-[9px] text-slate-600 uppercase tracking-wider flex items-center gap-1 font-bold">
                      <span>☕ AKIBA CAFE HUM</span>
                    </span>
                    <input type="range" v-model="environmentalCafe" min="0" max="100" class="w-28 accent-rose-500 h-1 bg-rose-100 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer status details -->
        <div class="p-5 border-t border-rose-100 bg-white/95 text-xs font-mono text-slate-400 flex justify-between items-center sticky bottom-0 backdrop-blur-md">
          <span>COMPILED VIA VITE V6</span>
          <button 
            @click="closeProjectDetail"
            class="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-sm transition-all cursor-pointer"
          >
            Acknowledge Blueprint
          </button>
        </div>
      </div>
    </div>

    <!-- ANIME MATCH & TRADING CARD GENERATOR PLAYGROUND -->
    <section id="playground" class="py-24 border-t border-rose-100/50 bg-[#FFF9FB]/30 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Intro header -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono mb-4 shadow-sm">
            <Compass class="w-3.5 h-3.5" />
            <span>Interactive Playground</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Otaku <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">Card Matcher</span>
          </h2>
          <p class="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Take a quick, responsive interactive quiz to discover your recommended anime match, and compile it into a fully-customizable, glowing cyber trading card!
          </p>
        </div>

        <!-- Main Quiz Stage Console -->
        <div class="max-w-3xl mx-auto bg-white border border-rose-100 rounded-[32px] overflow-hidden shadow-2xl shadow-rose-950/5 relative">
          <!-- Glass effect layer -->
          <div class="absolute inset-0 bg-gradient-to-tr from-rose-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>

          <!-- Console Header -->
          <div class="bg-rose-50/40 border-b border-rose-100 px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span class="text-xs font-mono font-bold uppercase text-slate-700 tracking-widest">Card Generation Matrix</span>
            </div>
            <div class="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
              <span>STAGE:</span>
              <span class="text-rose-500 font-bold">{{ quizStep }}/5</span>
            </div>
          </div>

          <!-- Step content switch -->
          <div class="p-8">
            
            <!-- STEP 1: Welcome -->
            <div v-if="quizStep === 1" class="space-y-6 text-center py-6">
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/10">
                <Sparkles class="w-7 h-7 text-white" />
              </div>
              <div class="space-y-2">
                <h3 class="text-xl font-bold text-slate-850 font-display">Synchronize Anime Affinity</h3>
                <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Our system will match you with the perfect seasonal or historic anime masterpiece based on your genre preferences and emotional mood matrix.
                </p>
              </div>
              <button 
                @click="quizStep = 2"
                class="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(244,63,94,0.3)] transition-all active:scale-95 duration-300 cursor-pointer"
              >
                Launch Ingest Sequence
              </button>
            </div>

            <!-- STEP 2: Choose Genre -->
            <div v-else-if="quizStep === 2" class="space-y-6">
              <div class="text-center space-y-1">
                <h4 class="text-sm font-mono text-rose-500 uppercase tracking-wider font-bold">Select Primary Genre Matrix</h4>
                <p class="text-xs text-slate-500">Which thematic narrative style sparks your interest?</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
                <button 
                  v-for="genre in ['Action', 'Sci-Fi', 'Fantasy', 'Slice of Life']" 
                  :key="genre"
                  @click="selectGenre(genre)"
                  class="p-5 rounded-2xl bg-white border border-rose-100 text-left hover:border-rose-400 hover:bg-rose-50/50 transition-all duration-300 group flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div class="text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Affinity Node</div>
                    <div class="text-sm font-bold text-slate-700 group-hover:text-rose-600 transition-colors">{{ genre }}</div>
                  </div>
                  <ChevronRight class="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>

            <!-- STEP 3: Choose Mood -->
            <div v-else-if="quizStep === 3" class="space-y-6">
              <div class="text-center space-y-1">
                <h4 class="text-sm font-mono text-rose-500 uppercase tracking-wider font-bold">Select emotional Vibe Matrix</h4>
                <p class="text-xs text-slate-500">What specific atmospheric energy matches your mindset?</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
                <button 
                  v-for="mood in ['Hype', 'Chill', 'Tearjerker', 'Mind-bending']" 
                  :key="mood"
                  @click="selectMood(mood)"
                  class="p-5 rounded-2xl bg-white border border-rose-100 text-left hover:border-rose-400 hover:bg-rose-50/50 transition-all duration-300 group flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div class="text-[9px] font-mono text-slate-450 uppercase tracking-widest mb-1">Emotion Valve</div>
                    <div class="text-sm font-bold text-slate-700 group-hover:text-rose-600 transition-colors">{{ mood }}</div>
                  </div>
                  <ChevronRight class="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div class="text-center pt-2">
                <button @click="quizStep = 2" class="text-xs text-slate-400 font-mono hover:text-rose-500 transition-all cursor-pointer">
                  ← Back to Genre Selection
                </button>
              </div>
            </div>

            <!-- STEP 4: Customize Card Style -->
            <div v-else-if="quizStep === 4" class="space-y-6 max-w-md mx-auto">
              <div class="text-center space-y-1">
                <h4 class="text-sm font-mono text-rose-500 uppercase tracking-wider font-bold">Personalize Card Identity</h4>
                <p class="text-xs text-slate-500">Imprint your signature code and aesthetic design parameters.</p>
              </div>

              <div class="space-y-4 pt-2">
                <!-- Name input -->
                <div class="space-y-2">
                  <label class="text-[10px] font-mono text-slate-400 uppercase">Master Trainer / Otaku Signature</label>
                  <input 
                    type="text" 
                    v-model="quizSelections.customName"
                    maxLength="20"
                    placeholder="Enter Otaku Name (e.g. AstroOtaku)" 
                    class="w-full bg-white border border-rose-100 text-slate-800 text-xs rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <!-- Color border select -->
                <div class="space-y-2">
                  <label class="text-[10px] font-mono text-slate-400 uppercase">Quantum Card Aesthetic Glow</label>
                  <div class="grid grid-cols-4 gap-2">
                    <button 
                      v-for="style in [
                        { id: 'cyber-cyan', name: 'Cyan', color: 'bg-cyan-500 border-cyan-400' },
                        { id: 'sakura-pink', name: 'Pink', color: 'bg-pink-500 border-pink-400' },
                        { id: 'neon-green', name: 'Green', color: 'bg-emerald-500 border-emerald-400' },
                        { id: 'solar-orange', name: 'Orange', color: 'bg-amber-500 border-amber-400' }
                      ]"
                      :key="style.id"
                      @click="quizSelections.cardStyle = style.id"
                      class="px-2.5 py-3 rounded-xl border-2 text-[10px] font-bold tracking-wider font-mono text-slate-950 transition-all flex flex-col items-center gap-1.5 cursor-pointer"
                      :class="quizSelections.cardStyle === style.id ? 'border-rose-500 scale-102 bg-rose-50/50 text-rose-600' : 'border-rose-100 bg-white text-slate-400 hover:bg-rose-50/30'"
                    >
                      <span class="w-3.5 h-3.5 rounded-full border border-white" :class="style.color"></span>
                      <span>{{ style.name }}</span>
                    </button>
                  </div>
                </div>

                <div class="pt-4 flex justify-between gap-4">
                  <button @click="quizStep = 3" class="flex-1 px-4 py-2.5 rounded-xl border border-rose-100 bg-white hover:bg-rose-50/40 text-slate-400 hover:text-slate-600 font-mono text-xs text-center transition-all cursor-pointer">
                    Back
                  </button>
                  <button @click="finishCardCustomization" class="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(244,63,94,0.3)] transition-all active:scale-95 cursor-pointer">
                    Generate Card
                  </button>
                </div>
              </div>
            </div>

            <!-- STEP 5: Card Complete Display -->
            <div v-else-if="quizStep === 5 && activeMatch" class="space-y-6">
              <div class="text-center space-y-1">
                <h4 class="text-xs font-mono text-emerald-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <CheckCircle class="w-4 h-4 text-emerald-500" />
                  <span>Card Compilation Succeeded!</span>
                </h4>
                <p class="text-xs text-slate-500">Your localized affinity signature is compiled down to the ledger.</p>
              </div>

              <!-- Main trading card graphic display -->
              <div class="flex justify-center py-4">
                <div 
                  class="relative w-72 bg-gradient-to-b border rounded-2xl p-4 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500"
                  :class="[cardThemeClasses.border, cardThemeClasses.bg, cardThemeClasses.glow]"
                >
                  <!-- Inner details design -->
                  <div class="flex justify-between items-start border-b border-rose-100/60 pb-2 mb-3">
                    <div class="flex items-center gap-1">
                      <span class="w-2.5 h-2.5 rounded-full" :class="cardThemeClasses.accentGlow"></span>
                      <span class="text-[10px] font-mono uppercase tracking-wider text-slate-550">{{ quizSelections.customName }}</span>
                    </div>
                    <span class="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">OTAKU CARD</span>
                  </div>

                  <!-- Anime image -->
                  <div class="h-36 rounded overflow-hidden bg-rose-50 relative border border-rose-100">
                    <img 
                      :src="activeMatch.image" 
                      :alt="activeMatch.title"
                      class="object-cover w-full h-full brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <!-- Rating badge overlay -->
                    <span class="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md text-amber-500 border border-rose-100 text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-sm">
                      ★ {{ activeMatch.rating }}
                    </span>
                  </div>

                  <!-- Details text -->
                  <div class="mt-3.5 space-y-2.5">
                    <div>
                      <h5 class="text-xs font-mono font-bold uppercase tracking-wide truncate" :class="cardThemeClasses.textAccent">
                        {{ activeMatch.jpTitle }}
                      </h5>
                      <h4 class="text-sm font-bold text-slate-800 truncate mt-0.5 font-display">
                        {{ activeMatch.title }}
                      </h4>
                    </div>

                    <p class="text-[9px] text-slate-500 leading-normal line-clamp-2 bg-rose-50/50 p-1.5 rounded-xl border border-rose-100/50">
                      {{ activeMatch.synopsis }}
                    </p>

                    <!-- Stats matrix layout -->
                    <div class="space-y-1.5 pt-1.5 border-t border-rose-100/60">
                      <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-mono text-slate-400">
                        <div class="flex justify-between border-b border-rose-100/40 pb-0.5">
                          <span>AESTHETIC</span>
                          <span class="text-slate-700 font-bold">{{ activeMatch.stats.aesthetic }}</span>
                        </div>
                        <div class="flex justify-between border-b border-rose-100/40 pb-0.5">
                          <span>STORY</span>
                          <span class="text-slate-700 font-bold">{{ activeMatch.stats.story }}</span>
                        </div>
                        <div class="flex justify-between border-b border-rose-100/40 pb-0.5">
                          <span>HYPE</span>
                          <span class="text-slate-700 font-bold">{{ activeMatch.stats.hype }}</span>
                        </div>
                        <div class="flex justify-between border-b border-rose-100/40 pb-0.5">
                          <span>FEELS</span>
                          <span class="text-slate-700 font-bold">{{ activeMatch.stats.feels }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Category tags -->
                    <div class="flex flex-wrap gap-1 mt-1 text-[8px] font-mono">
                      <span 
                        v-for="gen in activeMatch.genre" 
                        :key="gen"
                        class="px-1.5 py-0.5 rounded text-rose-600 bg-rose-50 border border-rose-100"
                      >
                        {{ gen }}
                      </span>
                      <span class="px-1.5 py-0.5 rounded uppercase font-bold" :class="cardThemeClasses.badge">
                        {{ quizSelections.mood }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Complete controls -->
              <div class="flex justify-center gap-4 pt-2">
                <button 
                  @click="resetCardQuiz"
                  class="px-5 py-2.5 rounded-xl border border-rose-100 bg-white hover:bg-rose-50/50 text-slate-500 hover:text-rose-500 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw class="w-3.5 h-3.5" />
                  <span>Generate New Matched Card</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- RPG STATUS SHEET / TECH SKILLS SECTION -->
    <section id="skills" class="py-24 border-t border-rose-100/50 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header texts -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono mb-4 shadow-sm">
            <Award class="w-3.5 h-3.5" />
            <span>Developer Status Board</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Otaku Character <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 font-display">Attributes</span>
          </h2>
          <p class="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            A specialized look at my coding mastery and technical stack, visualized as high-tier RPG class abilities and character stats.
          </p>
        </div>

        <!-- Filter toggles -->
        <div class="flex justify-center gap-2 mb-10">
          <button 
            v-for="filter in [
              { id: 'all', label: 'All Attributes' },
              { id: 'frontend', label: 'Front-End Magic' },
              { id: 'backend', label: 'Backend Alchemy' },
              { id: 'tools', label: 'Guild Weapons' }
            ]" 
            :key="filter.id"
            @click="activeSkillsFilter = filter.id as any"
            class="px-4 py-2 rounded-xl text-xs font-medium tracking-wide border transition-all cursor-pointer"
            :class="activeSkillsFilter === filter.id 
              ? 'bg-rose-500 text-white border-rose-500 font-semibold shadow-md shadow-rose-500/20' 
              : 'bg-white border-rose-100 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50'"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Skills grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="skill in filteredSkills" 
            :key="skill.name"
            class="bg-white border border-rose-100 rounded-3xl p-6 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-950/5 transition-all duration-300 relative overflow-hidden"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">Skill Node</span>
                <h4 class="text-sm font-bold text-slate-800 tracking-wide font-display">{{ skill.name }}</h4>
              </div>
              <span 
                class="px-1.5 py-0.5 rounded text-[8px] font-mono font-extrabold border"
                :class="[
                  skill.rarity === 'SSR' ? 'bg-rose-50 text-rose-600 border-rose-200/60' : '',
                  skill.rarity === 'SR' ? 'bg-indigo-50 text-indigo-600 border-indigo-200/60' : '',
                  skill.rarity === 'R' ? 'bg-slate-50 text-slate-500 border-slate-200/60' : ''
                ]"
              >
                {{ skill.rarity }}
              </span>
            </div>

            <!-- Stat descriptor -->
            <div class="flex justify-between items-center text-[10px] font-mono text-slate-550 mb-2.5">
              <span class="flex items-center gap-1">
                <Flame v-if="skill.category === 'frontend'" class="w-3.5 h-3.5 text-rose-500" />
                <Zap v-else-if="skill.category === 'backend'" class="w-3.5 h-3.5 text-indigo-500" />
                <Shield v-else class="w-3.5 h-3.5 text-slate-400" />
                <span>RPG Stat Name:</span>
              </span>
              <span class="text-slate-700 font-bold">{{ skill.rpgStatName }}</span>
            </div>

            <div class="flex justify-between items-center text-[10px] font-mono text-slate-550 mb-4">
              <span>Proficiency Class:</span>
              <span class="text-rose-600 font-bold">{{ skill.rpgStatValue }}</span>
            </div>

            <!-- Stats gauge bar -->
            <div class="space-y-1">
              <div class="flex justify-between text-[9px] font-mono text-slate-400">
                <span>DURABILITY CALIBRATION</span>
                <span>{{ skill.level }}%</span>
              </div>
              <div class="h-1 bg-rose-50/70 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-1000"
                  :style="`width: ${skill.level}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- TESTIMONIALS FROM ANIME LEGENDS SECTION -->
    <section id="testimonials" class="py-24 border-t border-rose-100/50 bg-[#FFF9FB]/30 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header texts -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono mb-4 shadow-sm">
            <MessageSquare class="w-3.5 h-3.5" />
            <span>Character Recommendations</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Otaku & Character <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 font-display">Reviews</span>
          </h2>
          <p class="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            See what legendary icons and fans across alternate dimensions think of my responsive layouts and developer capabilities.
          </p>
        </div>

        <!-- Slider View layout -->
        <div class="max-w-3xl mx-auto relative px-4 flex items-center gap-4">
          <!-- Slide Left Button -->
          <button 
            @click="prevTestimonial"
            class="p-2.5 rounded-full border border-rose-100 bg-white hover:bg-rose-50/50 text-slate-550 hover:text-rose-500 transition-all active:scale-90 shadow-sm cursor-pointer"
            title="Slide left review"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <!-- Main review quote card -->
          <div class="flex-1 bg-white border border-rose-100 rounded-[32px] p-6 md:p-8 relative overflow-hidden shadow-2xl shadow-rose-950/5 min-h-60 flex flex-col justify-between">
            <div class="absolute top-4 right-6 text-rose-100/60 font-serif text-7xl select-none leading-none">“</div>
            
            <div class="space-y-4">
              <p class="text-slate-700 italic text-sm md:text-base leading-relaxed relative z-10 font-sans">
                "{{ TESTIMONIALS_DATA[activeTestimonialIdx].quote }}"
              </p>
            </div>

            <!-- Author info block -->
            <div class="flex items-center gap-4 mt-6 pt-6 border-t border-rose-100">
              <div class="w-12 h-12 rounded-xl overflow-hidden bg-rose-50 border border-rose-150">
                <img 
                  :src="TESTIMONIALS_DATA[activeTestimonialIdx].avatar" 
                  :alt="TESTIMONIALS_DATA[activeTestimonialIdx].character"
                  class="object-cover w-full h-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 class="text-sm font-bold text-slate-800 tracking-wide font-display">
                  {{ TESTIMONIALS_DATA[activeTestimonialIdx].character }}
                </h4>
                <p class="text-xs text-rose-500 font-mono mt-0.5">
                  {{ TESTIMONIALS_DATA[activeTestimonialIdx].anime }} • <span class="text-slate-400 text-[10px]">{{ TESTIMONIALS_DATA[activeTestimonialIdx].relation }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Slide Right Button -->
          <button 
            @click="nextTestimonial"
            class="p-2.5 rounded-full border border-rose-100 bg-white hover:bg-rose-50/50 text-slate-550 hover:text-rose-500 transition-all active:scale-90 shadow-sm cursor-pointer"
            title="Slide right review"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>

        <!-- Slider dot markers -->
        <div class="flex justify-center gap-1.5 mt-6">
          <button 
            v-for="(t, i) in TESTIMONIALS_DATA" 
            :key="i"
            @click="activeTestimonialIdx = i"
            class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
            :class="activeTestimonialIdx === i ? 'bg-rose-500 w-5' : 'bg-rose-100 hover:bg-rose-200'"
          ></button>
        </div>

      </div>
    </section>

    <!-- TERMINAL-THEMED CONTACT FORM SECTION -->
    <section id="contact" class="py-24 border-t border-rose-100/50 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header texts -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-600 text-xs font-semibold uppercase tracking-widest font-mono mb-4 shadow-sm">
            <Terminal class="w-3.5 h-3.5" />
            <span>Secure Terminal Uplink</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Transmit Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600 font-display">Query Packet</span>
          </h2>
          <p class="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed">
            Type your message into our secure command input and execute the mailing script.
          </p>
        </div>

        <!-- Terminal Panel Layout -->
        <div class="max-w-2xl mx-auto bg-white border border-rose-100 rounded-[32px] overflow-hidden shadow-2xl shadow-rose-950/5 relative">
          <!-- Glass overlay -->
          <div class="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none"></div>

          <!-- Header bar -->
          <div class="bg-rose-50/40 border-b border-rose-100 px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="flex gap-1">
                <span class="w-2 h-2 rounded-full bg-red-500/80"></span>
                <span class="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                <span class="w-2 h-2 rounded-full bg-green-500/80"></span>
              </div>
              <span class="text-xs font-mono font-bold uppercase text-slate-600 tracking-wider ml-1.5">Mailing Host: kuro-terminal-v1</span>
            </div>
            <span class="text-[10px] text-slate-400 font-mono">PORT: 3000</span>
          </div>

          <!-- Main Terminal Form Container -->
          <div class="p-6 md:p-8 space-y-6">
            
            <!-- Standard form when NOT success -->
            <form v-if="!isFormSuccess" @submit.prevent="submitContactForm" class="space-y-4 font-sans">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="space-y-2">
                  <label class="text-[10px] font-mono text-slate-400 uppercase">Packet Sender Name</label>
                  <input 
                    type="text" 
                    v-model="formSenderName"
                    required
                    placeholder="Enter full name" 
                    class="w-full bg-white border border-rose-100 text-slate-800 text-xs rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
                <!-- Email -->
                <div class="space-y-2">
                  <label class="text-[10px] font-mono text-slate-400 uppercase">Routing Return Mail</label>
                  <input 
                    type="email" 
                    v-model="formSenderEmail"
                    required
                    placeholder="Enter email address" 
                    class="w-full bg-white border border-rose-100 text-slate-800 text-xs rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              <!-- Subject select -->
              <div class="space-y-2">
                <label class="text-[10px] font-mono text-slate-400 uppercase">Narrative Category Vector</label>
                <select 
                  v-model="formMessageSubject"
                  class="w-full bg-white border border-rose-100 text-slate-700 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500/50 cursor-pointer"
                >
                  <option value="Anime Site Project Query">Anime Site Project Query (Collab)</option>
                  <option value="SSR Contract Offer">SSR Contract Offer (Recruitment)</option>
                  <option value="Fan Mail">Otaku Fan Mail (Message)</option>
                  <option value="Other Protocol">Other Protocol (Random Query)</option>
                </select>
              </div>

              <!-- Message Text -->
              <div class="space-y-2">
                <label class="text-[10px] font-mono text-slate-400 uppercase">Payload Data / Message Body</label>
                <textarea 
                   rows="4" 
                  v-model="formMessageText"
                  required
                  placeholder="Type your transmission details..." 
                  class="w-full bg-white border border-rose-100 text-slate-800 text-xs rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 resize-none"
                ></textarea>
              </div>

              <!-- Submit button -->
              <div class="pt-2 flex justify-end">
                <button 
                  type="submit" 
                  :disabled="isFormSubmitting"
                  class="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_4px_15px_rgba(244,63,94,0.3)] transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <span v-if="isFormSubmitting">Transmitting Packet...</span>
                  <span v-else>Execute Send Sequence</span>
                  <Send class="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <!-- Loading Log outputs -->
            <div v-if="formConsoleLogs.length > 0" class="space-y-2.5 p-4 rounded-xl bg-rose-50/40 border border-rose-100 font-mono text-[10px] text-slate-650 overflow-y-auto max-h-48">
              <div v-for="(log, i) in formConsoleLogs" :key="i" class="flex gap-2">
                <span class="text-rose-500 select-none">kd-logs::</span>
                <span class="whitespace-pre-wrap leading-relaxed">{{ log }}</span>
              </div>
            </div>

            <!-- Success screen state -->
            <div v-if="isFormSuccess" class="text-center py-8 space-y-5">
              <div class="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-500 mx-auto flex items-center justify-center">
                <CheckCircle class="w-6 h-6 text-rose-500" />
              </div>
              <div class="space-y-1.5 max-w-sm mx-auto">
                <h3 class="text-lg font-bold text-slate-850 font-display">Transmission Delivered</h3>
                <p class="text-xs text-slate-500 leading-relaxed font-sans">
                  Your communication vector was routed into KuroDev's personal matrix ledger. Stand by for a prompt response.
                </p>
              </div>
              <button 
                @click="resetContactForm"
                class="px-5 py-2 rounded-xl bg-white border border-rose-100 hover:bg-rose-50/50 text-slate-550 font-mono text-xs hover:text-rose-500 transition-colors cursor-pointer shadow-sm"
              >
                ← Return to Terminal Input
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- FOOTER DESIGN -->
    <footer class="border-t border-rose-100 bg-white py-12 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <!-- Logo and brand details -->
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
            K
          </div>
          <span class="text-base font-bold tracking-tight text-slate-850 font-display">
            KURO<span class="text-rose-500">//</span>DEV
          </span>
          <span class="text-slate-400 font-mono text-[10px] ml-2">© 2026</span>
        </div>

        <!-- Extra credentials footer -->
        <div class="flex flex-col items-center md:items-end gap-1 text-[11px] font-mono text-slate-500">
          <span>Crafted in Vue 3 & Tailwind CSS // Designed with love for anime creators</span>
          <div class="flex items-center gap-2 text-slate-400 mt-1">
            <span>STABILITY: SSR EXCELLENT</span>
            <span>•</span>
            <span>THEME: VIBRANT PALETTE</span>
          </div>
        </div>

      </div>
    </footer>

  </div>
</template>

<style>
/* Custom animations and styling tricks for the 3D flipping card */
.perspective {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}

/* Audio wave visuals */
@keyframes audioWave {
  0%, 100% {
    d: path("M 0 20 Q 20 10, 40 20 T 80 20 T 120 20 T 160 20 T 200 20");
  }
  50% {
    d: path("M 0 20 Q 20 30, 40 20 T 80 10 T 120 30 T 160 10 T 200 20");
  }
}
@keyframes audioWaveReverse {
  0%, 100% {
    d: path("M 0 20 Q 25 30, 50 20 T 100 20 T 150 20 T 200 20");
  }
  50% {
    d: path("M 0 20 Q 25 10, 50 20 T 100 30 T 150 10 T 200 20");
  }
}

.animate-audio-wave {
  animation: audioWave 1.2s ease-in-out infinite alternate;
}
.animate-audio-wave-reverse {
  animation: audioWaveReverse 1s ease-in-out infinite alternate;
}

/* Stream reactions floating animations */
@keyframes floatUp {
  0% {
    transform: translateY(0) scale(0.6);
    opacity: 0;
  }
  15% {
    opacity: 1;
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    transform: translateY(-110px) scale(0.8);
    opacity: 0;
  }
}
</style>
