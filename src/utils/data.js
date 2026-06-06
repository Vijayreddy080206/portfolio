// ═══════════════════════════════════════════════════════════
// VIJAY VARDHAN PORTFOLIO — SINGLE SOURCE OF TRUTH
// All content, text, and data lives here.
// ═══════════════════════════════════════════════════════════

// ─── 1. Personal Info ───
export const personalInfo = {
  name: 'Vijay Vardhan Reddy Yammanuru',
  shortName: 'Vijay Vardhan',
  role: 'Data Analyst · AI/ML Developer · Big Data',
  university: 'NIIT University, Neemrana, Rajasthan',
  universityPeriod: '2023–2027',
  location: 'Hyderabad, India',
  email: 'vijayvardhanreddyyammanuru@gmail.com',
  phone: '+91 8985863450',
  linkedin: 'https://linkedin.com/in/vijay-vardhan', // TODO: Replace with actual LinkedIn URL
  github: 'https://github.com/vijayvardhan', // TODO: Replace with actual GitHub URL
  kaggle: 'https://kaggle.com/vijayvardhan', // TODO: Replace with actual Kaggle URL
  about: `I'm a 3rd-year B.Tech Big Data student at NIIT University with a deep obsession for building systems that think. Not just analyze — think. I engineered a prescriptive AI that outwitted a Mercedes F1 pit wall using Monte Carlo Tree Search. I built a brain activation visualizer powered by peer-reviewed 2025 neuroscience research. I don't wait to be given real problems — I go find them.\n\nMy stack spans Python, SQL, Power BI, React, FastAPI, Redis, and Three.js. I'm driven by one question: what decision does this data actually enable? That's what I build toward.`,
  availableFrom: 'July 2026',
};

// ─── 2. Typing Lines (Hero section) ───
export const typingLines = [
  'I build real-time analytics engines.',
  'I predict brain activation with AI.',
  'I turn 200,000 rows into insight.',
  'I simulate 8,000 race futures per lap.',
];

// ─── 3. Hero Stats ───
export const heroStats = [
  { value: 8000, suffix: '+', label: 'Race futures / lap', accent: 'blue' },
  { value: 89.1, suffix: '%', label: 'F1 Strategy Accuracy', accent: 'teal', decimals: 1 },
  { value: 20484, suffix: '', label: 'Brain vertices predicted', accent: 'blue' },
  { value: 200, suffix: 'K+', label: 'IPL rows analyzed', accent: 'teal' },
];

// ─── 4. Projects ───
export const projects = [
  {
    id: 'f1-strategy',
    title: 'F1 Real-Time Prescriptive Analytics Engine',
    badge: 'FEATURED',
    badgeType: 'featured',
    category: 'AI / Prescriptive Analytics',
    year: '2026',
    tags: ['Python', 'MCTS', 'Redis', 'React', 'FastF1 API'],
    featured: true,
    whatISolved: `Formula 1 races are decided in milliseconds. Pit wall engineers make gut-feel decisions under pressure with incomplete data. I built a system that doesn't.`,
    impactPoints: [
      '8,000+ alternate futures simulated per lap',
      '<0.15s decision time per driver — all 20 cars',
      '89.1% strategy alignment vs live 2026 telemetry',
      'Outperformed Mercedes by 2 laps at Suzuka GP',
    ],
    howIBuiltIt: `Engineered a Monte Carlo Tree Search engine with Deep-Branching Heuristics. Solved Python GIL bottleneck with concurrent.futures.ThreadPoolExecutor. Built dual Redis Pub/Sub pipes — raw FIA telemetry in, strategic commands out to live React dashboard. Back-tested against Australian, Chinese, and Japanese GP 2026 telemetry. Full fault tolerance: handles null telemetry, DNS events, dirty data — without dropping a frame.`,
    githubLink: '#', // TODO: Replace with actual GitHub URL
  },
  {
    id: 'neurolens',
    title: 'NeuroLens — Cognitive Load Analyzer',
    badge: 'AI/ML',
    badgeType: 'aiml',
    category: 'Neuroscience AI',
    year: '2026',
    tags: ['React', 'FastAPI', 'Three.js', 'Meta AI TRIBE v2', 'Kaggle P100 GPU'],
    featured: true,
    whatISolved: `Teachers have no idea if their students are actually engaged or mentally checked out. I built an AI that watches a lecture video and maps second-by-second brain activation across 20,484 cortical vertices.`,
    impactPoints: [
      '20,484 brain vertices predicted per second',
      '3 fused modalities: video + audio + transcript',
      'Based on peer-reviewed research — Benchetrit et al., 2025',
      '2–3× better accuracy than prior cognitive load methods',
    ],
    howIBuiltIt: `Fused V-JEPA2 (video), wav2vec 2.0 (audio), and Llama 3.2 (transcript) through a Transformer into unified brain representations. Deployed on Kaggle P100 GPU via ngrok. Built custom Three.js 3D brain viewer — binary GLB parser, per-vertex fMRI heatmap at 60fps with lerp animation. Alert system gives educators exact timestamps: '4:32–6:18: students disengaged.'`,
    githubLink: '#', // TODO: Replace with actual GitHub URL
  },
  {
    id: 'ipl-analytics',
    title: 'IPL Analytics Dashboard',
    badge: 'DATA ANALYTICS',
    badgeType: 'analytics',
    category: 'Business Intelligence',
    year: '2024',
    tags: ['SQL', 'MySQL', 'Power BI', 'DAX', 'Python'],
    featured: false,
    whatISolved: `16 years of IPL data. 200,000+ rows. Scattered across formats. No single source of truth for analysts.`,
    impactPoints: [
      '200,000+ rows cleaned and modeled',
      '2008–2023 complete season coverage',
      'MySQL pre-computation → dramatically faster Power BI queries',
      'Interactive season slicer with KPI cards and venue analysis',
    ],
    howIBuiltIt: `Built MySQL as the data warehouse. Engineered complex SQL (CASE WHEN, CREATE TABLE) to pre-calculate Winner, Runner-Up, Orange Cap, Purple Cap metrics — offloading computation from Power BI. Built neon-themed interactive dashboard with season slicers driving KPI cards, points table, toss analysis, and venue breakdowns.`,
    githubLink: '#', // TODO: Replace with actual GitHub URL
  },
  {
    id: 'hoshitha-boutique',
    title: 'Hoshitha Boutique',
    badge: 'FULL STACK',
    badgeType: 'fullstack',
    category: 'E-Commerce',
    year: '2024-25',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Vercel'],
    featured: false,
    whatISolved: `Full-stack MERN e-commerce platform with RBAC authentication, SMTP order notifications, CORS resolution, SEO optimization. Live and publicly accessible.`,
    impactPoints: [
      'Decoupled MERN: React on Vercel, Node.js on Render',
      'bcryptjs auth with Role-Based Access Control',
      'Automated Nodemailer/SMTP order notifications',
      'Google Search Console indexed and SEO optimized',
    ],
    howIBuiltIt: `Architected decoupled MERN app. Diagnosed CORS conflicts between Vercel and Render. Resolved IPv6 timeout issues routing SMTP through Port 587. Improved SEO via Open Graph tags and Google Search Console.`,
    githubLink: '#', // TODO: Replace with actual GitHub URL
  },
];

// ─── 5. Skill Categories ───
export const skillCategories = [
  {
    name: 'Data & Analytics',
    accent: 'teal',
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'DAX', 'Power Query'],
  },
  {
    name: 'AI / Machine Learning',
    accent: 'blue',
    skills: ['Monte Carlo Tree Search', 'Meta AI TRIBE v2', 'scikit-learn', 'Transformer fusion', 'V-JEPA2', 'wav2vec 2.0', 'Llama 3.2', 'FastF1 API', 'HuggingFace Hub'],
  },
  {
    name: 'Backend & Data Engineering',
    accent: 'teal',
    skills: ['FastAPI', 'Node.js', 'Express.js', 'Redis Pub/Sub', 'WebSocket', 'concurrent.futures', 'REST APIs', 'MySQL', 'MongoDB', 'Mongoose ODM'],
  },
  {
    name: 'Frontend & Visualization',
    accent: 'blue',
    skills: ['React 18', 'Three.js', 'WebGL', 'Vite', 'JavaScript', 'HTML/CSS'],
  },
  {
    name: 'Cloud & Infrastructure',
    accent: 'gray',
    skills: ['Kaggle P100 GPU', 'Vercel', 'Render', 'ngrok', 'Git', 'GitHub'],
  },
  {
    name: 'Soft Skills',
    accent: 'gray',
    skills: ['Team Leadership', 'Stakeholder Management', 'Cross-functional Coordination', 'Process Documentation', 'Event Operations'],
  },
];

// ─── 6. Certifications ───
export const certifications = [
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte via Forage',
    topics: 'Data Analysis · Forensic Technology',
    note: null,
    date: 'Dec 2025',
    accent: 'teal',
    credlyLink: '#', // TODO: add real link
  },
  {
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'TATA via Forage',
    topics: 'Data Visualization · Business Insights',
    note: null,
    date: 'Dec 2025',
    accent: 'blue',
    credlyLink: '#', // TODO: add real link
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google Career Certificates',
    topics: 'AI fundamentals · Prompt engineering · Responsible AI',
    note: 'Credly Verified',
    date: 'Dec 2025',
    accent: 'teal',
    credlyLink: '#', // TODO: add real link
  },
  {
    title: 'SQL Essential Training',
    issuer: 'LinkedIn Learning',
    topics: 'SQL · Database querying · Data manipulation',
    note: '7.8 CPE Credits — NASBA Accredited',
    date: 'Feb 2026',
    accent: 'blue',
    credlyLink: '#', // TODO: add real link
  },
  {
    title: 'Complete Your First Project in SQL',
    issuer: 'LinkedIn Learning',
    topics: 'SQL · Hands-on project',
    note: null,
    date: 'Feb 2026',
    accent: 'teal',
    credlyLink: '#', // TODO: add real link
  },
  {
    title: 'Operations Core Certificate',
    issuer: 'NIIT University — siNUsoid v9',
    topics: 'Event Operations · Team Leadership',
    note: 'Letter of Recommendation from Dean of Student Affairs',
    date: 'Nov 2025',
    accent: 'blue',
    credlyLink: '#', // TODO: add real link
  },
];

// ─── 7. Timeline Events ───
export const timelineEvents = [
  {
    year: '2021',
    title: 'Scored 99.5% in Class 10',
    subtitle: 'Narayana Olympiad School, AP',
    icon: 'graduation',
    color: 'gray',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2023',
    title: 'Scored 88% in Class 12',
    subtitle: 'Narayana JR. College, AP',
    icon: 'graduation',
    color: 'gray',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2023',
    title: 'Started B.Tech Big Data · NIIT University',
    subtitle: 'Where the real building began.',
    icon: 'university',
    color: 'teal',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2024',
    title: 'Built IPL Analytics Dashboard',
    subtitle: '200K rows · SQL + Power BI · First major DS project',
    icon: 'chart',
    color: 'teal',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2024',
    title: 'Led siNUsoid v9 Operations',
    subtitle: '100+ volunteers · 5,000+ attendees · Dean\'s LoR',
    icon: 'users',
    color: 'blue',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2024-25',
    title: 'Deployed Hoshitha Boutique',
    subtitle: 'Live MERN e-commerce · Full-stack production app',
    icon: 'code',
    color: 'gray',
    highlight: false,
    isPulse: false,
  },
  {
    year: 'Dec 2025',
    title: 'Earned 3 certifications in one month',
    subtitle: 'Deloitte · TATA · Google AI Essentials',
    icon: 'certificate',
    color: 'teal',
    highlight: false,
    isPulse: false,
  },
  {
    year: 'Feb 2026',
    title: 'Engineered F1 Prescriptive Engine',
    subtitle: 'Outperformed Mercedes at Suzuka · 89.1% accuracy',
    icon: 'flag',
    color: 'blue',
    highlight: true,
    isPulse: false,
  },
  {
    year: '2026',
    title: 'Built NeuroLens',
    subtitle: 'Meta AI TRIBE v2 · 20,484 brain vertices predicted',
    icon: 'brain',
    color: 'blue',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2026–Present',
    title: 'Head of Elections · NIIT Student Council',
    subtitle: 'Campus-wide election management',
    icon: 'users',
    color: 'gray',
    highlight: false,
    isPulse: false,
  },
  {
    year: 'Next',
    title: 'Seeking Data Analyst / AI-ML Internship',
    subtitle: 'Ready to deliver measurable impact',
    icon: 'rocket',
    color: 'teal',
    highlight: false,
    isPulse: true,
  },
];

// ─── 8. Navigation Links ───
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

// ─── 9. Loading Messages ───
export const loadingMessages = [
  'Initializing data pipelines...',
  'Loading neural networks...',
  'Calibrating race engine...',
  'Ready.',
];
