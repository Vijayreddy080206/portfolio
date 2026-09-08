// ═══════════════════════════════════════════════════════════
// VIJAY VARDHAN PORTFOLIO — SINGLE SOURCE OF TRUTH
// All content, text, and data lives here.
// ═══════════════════════════════════════════════════════════

// ─── 1. Personal Info ───
export const personalInfo = {
  name: 'Vijay Vardhan Reddy Yammanuru',
  shortName: 'Vijay Vardhan',
  role: 'Data Analyst & AI/ML Developer',
  university: 'NIIT University, Neemrana, Rajasthan',
  universityPeriod: '2023–2027',
  location: 'Hyderabad, India',
  email: 'vijayvardhanreddyyammanuru@gmail.com',
  phone: '+91 8985863450',
  linkedin: 'https://www.linkedin.com/in/vijayvardhanreddy-yammanuru-09472837b',
  github: 'https://github.com/Vijayreddy080206?tab=repositories',
  about: `I'm a 3rd-year B.Tech Big Data student at NIIT University with a deep obsession for building systems that think. Not just analyze — think. I engineered a prescriptive AI that outwitted a Mercedes F1 pit wall using Monte Carlo Tree Search. I built a healthcare ML system that predicts patient readmission risk across 130 US hospitals. I don't wait to be given real problems — I go find them.\\n\\nMy stack spans Python, SQL, Power BI, React, FastAPI, Redis, and Three.js. I'm driven by one question: what decision does this data actually enable? That's what I build toward.`,
  availableFrom: 'Available Immediately',
  cvLink: '/vijay-cv.pdf',
  resumeLink: '/vijay-resume.pdf',
};

// ─── 2. Typing Lines (Hero section) ───
export const typingLines = [
  'I build real-time analytics engines.',
  'I predict patient readmission risk with ML.',
  'I turn 200,000 rows into insight.',
  'I simulate 8,000 race futures per lap.',
];

// ─── 3. Hero Stats ───
export const heroStats = [
  { value: 8000, suffix: '+', label: 'Race futures / lap', accent: 'blue', tooltip: 'MCTS simulation engine' },
  { value: 89.1, suffix: '%', label: 'F1 Strategy Accuracy', accent: 'teal', decimals: 1, tooltip: 'Vs live 2026 telemetry' },
  { value: 81414, suffix: '', label: 'Patient encounters analyzed', accent: 'blue', tooltip: '130 US hospitals dataset' },
  { value: 200, suffix: 'K+', label: 'IPL rows analyzed', accent: 'teal', tooltip: '16 seasons data warehouse' },
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
    githubLink: 'https://github.com/Vijayreddy080206/f1-strategy-system',
  },
  {
    id: 'hospital-readmission',
    title: 'Hospital Patient Readmission Risk Prediction',
    badge: 'AI/ML',
    badgeType: 'aiml',
    category: 'Healthcare ML',
    year: '2026',
    tags: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Jupyter Notebook'],
    featured: true,
    whatISolved: `Hospitals face $500M+/year in CMS readmission penalties when diabetic patients are readmitted within 30 days. Built a machine learning system to predict high-risk patients so care teams can intervene early — prioritizing recall over accuracy because missing a true readmission is more costly than a false alarm.`,
    impactPoints: [
      '81,414 patient encounters from 130 US hospitals',
      '31 engineered features from 50 raw columns',
      '65% recall on readmission class — deliberate trade-off',
      'Fairness audit revealed age-bias gap in younger patients',
    ],
    howIBuiltIt: `Built on the UCI Diabetes 130-US Hospitals dataset. Cleaned 83-95% missing columns, converted age buckets to numeric, aggregated 20+ medication columns, mapped ICD codes into 8 clinical categories. Trained Logistic Regression (interpretable, for clinician trust) and Decision Tree with class_weight="balanced" for 9% class imbalance. Tested SMOTE but discovered it corrupts one-hot features — reverted to balanced weighting. Performed custom fairness audit by age group: found recall near 0% for youngest patients vs 88% for 85+ — a real deployment-blocking bias. Fixed 6 bugs including a data leakage bug (scaler refit on test data) and a silent label-swap in classification_report.`,
    githubLink: 'https://github.com/Vijayreddy080206?tab=repositories',
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
    howIBuiltIt: `Built MySQL as the data warehouse. Engineered complex SQL (CASE WHEN, CREATE TABLE) to pre-calculate Winner, Runner-Up, Orange Cap, Purple Cap metrics - offloading computation from Power BI. Built neon-themed interactive dashboard with season slicers driving KPI cards, points table, toss analysis, and venue breakdowns.`,
    githubLink: 'https://github.com/Vijayreddy080206/ipl-powerBI-dashboard',
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
    whatISolved: `Full-stack MERN e-commerce platform with RBAC authentication, SMTP order notifications, CORS resolution, and SEO optimization. Live and publicly accessible.`,
    impactPoints: [
      'RBAC with 3 user roles',
      'SMTP email on order',
      'Live on Vercel',
      'SEO optimized'
    ],
    howIBuiltIt: `Architected and deployed a decoupled MERN application: React.js + Vite on Vercel, Node.js/Express.js on Render, MongoDB for e-commerce data. Diagnosed CORS conflicts between Vercel and Render; resolved IPv6 timeout issues by routing SMTP through Port 587. Improved SEO via Open Graph tags and Google Search Console indexing.`,
    githubLink: 'https://github.com/Vijayreddy080206/hoshitha-boutique',
    liveLink: 'https://hoshitha-boutique-shop.vercel.app/',
  },
];

// ─── 5. Skill Categories ───
export const skillCategories = [
  {
    name: 'Data & Analytics',
    accent: 'teal',
    skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Matplotlib', 'DAX', 'Power Query', 'Jupyter Notebook'],
  },
  {
    name: 'AI / Machine Learning',
    accent: 'blue',
    skills: ['scikit-learn', 'LogisticRegressionCV', 'DecisionTreeClassifier', 'RandomForestClassifier', 'imbalanced-learn (SMOTE)', 'StandardScaler', 'KFold Cross-Validation', 'Feature Engineering', 'Monte Carlo Tree Search', 'FastF1 API'],
  },
  {
    name: 'Backend & Data Engineering',
    accent: 'teal',
    skills: ['Node.js', 'Express.js', 'Redis Pub/Sub', 'WebSocket', 'concurrent.futures', 'REST APIs', 'MySQL', 'MongoDB', 'Mongoose ODM'],
  },
  {
    name: 'Frontend & Visualization',
    accent: 'blue',
    skills: ['React 18', 'Vite', 'JavaScript', 'HTML/CSS', 'Chart.js', 'Framer Motion'],
  },
  {
    name: 'Cloud & Infrastructure',
    accent: 'gray',
    skills: ['Vercel', 'Render', 'Git', 'GitHub', 'Jupyter Notebook'],
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
    credlyLink: '/certificates/deloitte certificate.pdf',
  },
  {
    title: 'Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'TATA via Forage',
    topics: 'Data Visualization · Business Insights',
    note: null,
    date: 'Dec 2025',
    accent: 'blue',
    credlyLink: '/certificates/tata data visualisation certificate.pdf',
  },
  {
    title: 'Google AI Essentials',
    issuer: 'Google Career Certificates',
    topics: 'AI fundamentals · Prompt engineering · Responsible AI',
    note: 'Credly Verified',
    date: 'Dec 2025',
    accent: 'teal',
    credlyLink: '/certificates/GoogleAIEssentials certificate.pdf',
  },
  {
    title: 'SQL Essential Training',
    issuer: 'LinkedIn Learning',
    topics: 'SQL · Database querying · Data manipulation',
    note: '7.8 CPE Credits — NASBA Accredited',
    date: 'Feb 2026',
    accent: 'blue',
    credlyLink: '/certificates/SQL Essential Training CertificateOfCompletion.pdf',
  },
  {
    title: 'Complete Your First Project in SQL',
    issuer: 'LinkedIn Learning',
    topics: 'SQL · Hands-on project',
    note: null,
    date: 'Feb 2026',
    accent: 'teal',
    credlyLink: '/certificates/Complete Your First Project in SQL CertificateOfCompletion.pdf',
  },
  {
    title: 'Operations Core Certificate',
    issuer: 'NIIT University — siNUsoid v9',
    topics: 'Event Operations · Team Leadership',
    note: 'Letter of Recommendation from Dean of Student Affairs',
    date: 'Nov 2025',
    accent: 'blue',
    credlyLink: '/certificates/sino certificate.png',
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
    title: 'Lead Operations · siNUsoid v9',
    subtitle: 'Managed DJ nights & sports events · 100+ volunteers · 5,000+ attendees',
    icon: 'users',
    color: 'gray',
    highlight: false,
    isPulse: false,
  },
  {
    year: '2025',
    title: 'Core Operations · siNUsoid v9',
    subtitle: 'Full event ownership · Vendor management · Dean\'s LoR',
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
    title: 'Built Hospital Readmission Predictor',
    subtitle: 'Healthcare ML · 81K patient encounters · Fairness audit',
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
