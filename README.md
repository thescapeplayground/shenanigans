# Minimalist Personal Portfolio

A highly polished, responsive, and minimalist developer homepage and project showcase. Inspired by minimalist modern design and swiss grid principles, this portfolio is built with Next.js 15, Tailwind CSS, Base UI, and Framer Motion, featuring elegant typography, dark/light theme switching, and beautiful interactive micro-utilities.

---

## ✨ Features

- 🖥️ **Swiss Minimalist Grid Layout**: A clean, balanced, grid-based aesthetic showcasing typography, generous white space, and subtle transition effects.
- 🕒 **Dynamic Presence Clock Widget**: A live component capturing user local time, map-pin status, connection telemetry (ping), and activity/presence state.
- 📁 **Adaptive Projects Grid Area**: Filterable, searchable portfolio interface featuring detailed modal cards, GitHub linking, and custom metrics.
- 🛠️ **Unified Stack Toolbox Overlay**: A curated showcase grouping system utilities, front-end layers, server infrastructure tooling, and physical hardware layouts.
- ✉️ **Integrated Contact Form Sheet**: Interactive and secure contact form with instant validation feedback, animated send sequences, and dynamic copy-to-clipboard functionality for emails.
- 🌓 **Dynamic Theme Engine**: Smooth dark and light mode toggle syncs seamlessly with native desktop configurations (`prefers-color-scheme`).

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router, Server Components by default, optimized assets)
- **UI & Core Styling**: Tailwind CSS, `@base-ui/react` (headless interactive primitives)
- **Animation Framework**: Framer Motion (`motion/react`)
- **Icon Library**: Lucide React
- **Typography**: `@fontsource-variable/geist` 

---

## 🚀 Getting Started

### 1. Installation

Install project dependencies:
```bash
npm install
```

### 2. Development Mode

Launch the local development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser of choice.

### 3. Production Build

Build the optimized production assets:
```bash
npm run build
```

Run the built application:
```bash
npm run start
```

### 4. Contact Form (Resend Email)

The contact form posts to an API route at `src/app/api/contact/route.ts`, which uses [Resend](https://resend.com) to deliver messages to your inbox.

1. Copy the example env file and fill in your values:
   ```bash
   cp .env.example .env
   ```
2. Set the required variables (see `.env.example`):
   - `RESEND_API_KEY` — your Resend API key.
   - `RESEND_FROM_ADDRESS` — verified sender address (use `onboarding@resend.dev` for testing).
   - `CONTACT_TO_ADDRESS` — inbox that receives form submissions.

> **Note on static export:** `next.config.js` currently sets `output: "export"`, which produces a fully static site and does **not** run API route handlers in production. The contact route works during `npm run dev`. To enable email sending in a deployed production build, remove `output: "export"` (and the `mv out dist` step in the `build` script) so Next.js runs as a server, or deploy the route as a serverless function.

---

## 📁 File Structure

```text
├── components/          # Reusable shared React elements
│   ├── ui/              # Base UI-styled custom primitive controls (button, badge, etc.)
│   ├── HomeSection.tsx  # Interactive intro and bio area
│   ├── PresenceClock    # Dynamic clock metrics list
│   └── ThemeToggle.tsx  # Seamless dark-light theme toggle
├── src/
│   ├── app/             # Next.js page routes, layout structure, and system configuration
│   ├── types.ts         # Strictly-typed schemas for profiles and projects
│   └── data.ts          # Core static fallback configuration data and presets
└── tailwind.config      # Configured post-CSS utility layers and layouts
```
