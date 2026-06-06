# Vijay Vardhan — Portfolio

A modern, dark-themed developer portfolio built with **React + Vite**, featuring smooth Framer Motion animations, a 3D particle hero powered by Three.js, and a fully responsive design system.

---

## 🚀 Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Framework    | React 18                                        |
| Build Tool   | Vite 6                                          |
| Animations   | Framer Motion 11                                |
| 3D Graphics  | Three.js + @react-three/fiber + @react-three/drei |
| Icons        | React Icons                                     |
| Contact Form | EmailJS                                         |
| Fonts        | Syne (display) · DM Mono (code/data)            |
| Deployment   | Vercel                                          |

---

## 📦 Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/vijay-portfolio.git
cd vijay-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server (opens http://localhost:3000)
npm run dev
```

---

## ✏️ What to Customize

Before deploying, update the following items to make the portfolio yours:

### Files to Replace

| File                      | Action                                                 |
| ------------------------- | ------------------------------------------------------ |
| `public/vijay-cv.pdf`     | Replace with your actual CV in PDF format              |
| `public/vijay-resume.pdf` | Replace with your actual one-page resume in PDF format |
| `public/og-image.png`     | Replace with a 1200×630 social preview image           |

### Data & Links

All personal data lives in **`src/utils/data.js`**. Update these fields:

- **LinkedIn URL** — your LinkedIn profile link
- **GitHub URL** — your GitHub profile link
- **Kaggle URL** — your Kaggle profile link
- **Profile photo path** — add your photo to `public/` and update the path in `data.js`
- **Project details** — titles, descriptions, tech stacks, and links
- **Skills & experience** — adjust to match your background

### EmailJS Configuration

In **`src/components/Contact.jsx`**, replace the placeholder credentials:

```js
// TODO: Replace with your EmailJS credentials
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';
```

Sign up at [emailjs.com](https://www.emailjs.com/) and create a service + template to get these values.

---

## 🏗️ Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The output is written to the `dist/` directory.

---

## 🌐 Deploy to Vercel

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Vite — no extra configuration needed.
4. The included `vercel.json` handles SPA routing automatically.
5. Click **Deploy** and you're live!

Alternatively, deploy via the Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

---

## 📁 Project Structure

```
vijay-portfolio/
├── index.html              # Entry HTML with SEO meta tags
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel SPA rewrite rules
├── public/
│   ├── vijay-cv.pdf        # Your CV (replace placeholder)
│   ├── vijay-resume.pdf    # Your resume (replace placeholder)
│   └── og-image.png        # Social preview image
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Root component with section layout
    ├── styles/
    │   └── global.css      # CSS variables & design tokens
    ├── components/
    │   ├── Navbar.jsx       # Navigation bar
    │   ├── Hero.jsx         # Hero section with 3D background
    │   ├── About.jsx        # About me section
    │   ├── Skills.jsx       # Skills & technologies
    │   ├── Projects.jsx     # Project showcase
    │   ├── Experience.jsx   # Work experience timeline
    │   ├── Contact.jsx      # Contact form (EmailJS)
    │   └── Footer.jsx       # Footer with social links
    └── utils/
        └── data.js          # All personal data & content
```

---

## 📄 License

MIT © Vijay Vardhan
