# PaddockDual 🏎️ — F1 Dual-Install & Profile Isolation Suite

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini 3.8 Flash](https://img.shields.io/badge/Powered%20by-Gemini%203.8%20Flash-ea4335.svg?logo=google&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

**PaddockDual** is a specialized companion web application and setup manager engineered for PC Formula 1 racers (F1 25, F1 24, F1 23, and upcoming F1 26). It solves the dual-installation dilemma: maintaining a pristine, 100% untouched official game for EA Anti-Cheat (EAAC) ranked multiplayer, while running a fully modded, DLC-unlocked offline environment via Swofty Launcher and CreamInstaller without risking account bans or corrupting career saves.

---

## 📋 The Dilemma PaddockDual Solves

1. **Kernel Anti-Cheat (EAAC) Detection**: Running official multiplayer with modified DLLs (`SmokeAPI`, `version.dll`) in the root folder risks immediate anti-cheat detection and account penalties.
2. **Save File Cross-Contamination**: Both the clean and modded games default to the same Windows path: `%USERPROFILE%\Documents\My Games\F1 25\`. Unlocking podium passes or liveries offline causes EA Racenet servers to reject or corrupt save profiles when booting into multiplayer.
3. **CreamInstaller Detection Lock**: CreamInstaller only scans default registry-registered paths. Modifying the folder directly corrupts your clean copy.

---

## ✨ Features

- **🛡️ Option B Setup Wizard (Windows User Account Isolation)**:
  - Guided walkthrough for physically separating game files and user documents.
  - Generates fast multi-threaded `robocopy` duplication scripts.
  - Interactive diagram of the **10-Second Folder Swap Trick** so CreamInstaller never touches your official clean directory.
  - Administrator CMD & PowerShell one-liners for instant user creation.

- **⚡ Option A Batch Automation Suite**:
  - Live `.bat` script generator with custom path interpolation.
  - Safe 1-click desktop launchers (`Launch_F1_Online.bat` and `Launch_F1_Offline_Swofty.bat`) that swap save folders automatically before game boot.
  - Direct in-browser file download and copy-to-clipboard.

- **🧪 Interactive Drive & Save Sandbox (Live Simulator)**:
  - Visual filesystem map showing Drive `D:\Games\` (`F1 25` vs `F1 25 - Offline`) and Drive `C:\Users\` document profiles.
  - Real-time simulation of Online EA launches vs. Swofty Offline launches with full diagnostic logging.

- **🤖 Gemini AI Step Troubleshooter (`gemini-3.8-flash`)**:
  - Dedicated "Troubleshoot with Gemini" buttons for every setup stage.
  - Curated quick-issue selectors (Access denied errors, folder swap accidents, missing DLCs, wheel calibration).
  - Server-side diagnosis providing root-cause analysis, step-by-step remediation, and copyable commands.

- **📊 Comprehensive Anti-Cheat & DRM Safety Matrix**:
  - Technical audit detailing EAAC Ring-0 driver mechanics, Racenet cloud sync hazards, and pure entitlement vs. raw asset requirements.

- **🔄 Title Update & Wheel Calibration Protocol**:
  - 4-phase safe update workflow for EA game patches.
  - One-click script to migrate steering wheel force feedback and button mappings (`hardware_settings_config.xml`) between Windows accounts.

---

## 🖥️ Architecture Overview

```
                                      [ PaddockDual Architecture ]
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 ▼                                                                     ▼
    [ Official Online Environment ]                                       [ Modded Offline Environment ]
    • Directory: D:\Games\F1 25 (100% Clean)                              • Directory: D:\Games\F1 25 - Offline
    • Launcher: EA App / Epic Games Launcher                              • Launcher: Swofty Launcher (-noeac -offline)
    • AntiCheat: EA Anti-Cheat (Active & Valid)                           • AntiCheat: Bypassed & Suspended
    • Saves: C:\Users\<MainUser>\Documents\My Games\                      • Saves: C:\Users\Offline Gaming\Documents\My Games\
    • Entitlements: Legal Store Purchases Only                            • Entitlements: CreamInstaller / SmokeAPI Unlocked
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [npm](https://www.npmjs.com/) (version 10.x or higher)
- A Google Gemini API Key (optional, for live AI troubleshooting — configure via [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/paddockdual-f1-manager.git
   cd paddockdual-f1-manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional for local diagnostics; built-in fallbacks are provided if omitted):
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   PORT=3000
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 🛠️ Build & Free Hosting Guide

### Method 1: Render (Recommended for Full-Stack + Live Gemini AI) — 100% Free
Render provides a free Web Service tier that runs Node.js + Express + Vite and keeps your server-side Gemini API key completely secure.

1. Push your repository to **GitHub**.
2. Sign in to [Render.com](https://render.com/) with your GitHub account.
3. Click **New +** → **Web Service** → Select your repository.
4. Configure these exact settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan Type**: `Free`
5. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key from Google AI Studio)*
   - `NODE_ENV`: `production`
6. Click **Create Web Service**. Render will build and deploy your applet with a free HTTPS URL (`https://your-app.onrender.com`).

---

### Method 2: Vercel (Fastest Serverless Deployment) — 100% Free
1. Sign in to [Vercel.com](https://vercel.com/) with your GitHub account.
2. Click **Add New...** → **Project** → Import your repository.
3. Framework Preset will auto-detect **Vite**.
4. Set Build Command: `npm run build`, Output Directory: `dist`.
5. Under **Environment Variables**, add `GEMINI_API_KEY`.
6. Click **Deploy**. Vercel will deploy your site on global edge CDN with free automatic SSL.

---

### Method 3: GitHub Pages (Free Static Client Hosting)
If you only need the client-side guides, scripts, sandboxes, and offline diagnostics:
1. In `package.json`, add `"homepage": "https://<your-username>.github.io/<repo-name>"`
2. In `vite.config.ts`, add `base: './'`
3. Run `npm run build`
4. In your GitHub repo: Go to **Settings** → **Pages** → Source: **Deploy from branch** → Branch: `main` (folder `/dist` or use the GitHub Actions Vite template).

---

## 📂 Project Structure

```
├── .env.example                # Template for environment variables
├── index.html                  # HTML entry point with Plus Jakarta Sans & JetBrains Mono fonts
├── metadata.json               # AI Studio build metadata and server capabilities
├── package.json                # Project dependencies and full-stack scripts
├── server.ts                   # Express server with Vite middlewares & Gemini API endpoint
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + Tailwind v4 + React configuration
└── src/
    ├── main.tsx                # Client React entry point
    ├── index.css               # Tailwind CSS v4 styling rules
    ├── App.tsx                 # Root application component & layout orchestrator
    ├── types/
    │   └── index.ts            # TypeScript interfaces (PathConfig, SetupStep, RiskItem)
    ├── data/
    │   └── guideContent.ts     # Step data, safety items, and batch script generators
    └── components/
        ├── Header.tsx                  # Top navigation bar
        ├── PathConfigModal.tsx         # Path customization dialog (Clean/Offline paths)
        ├── OptionBWizard.tsx           # Step-by-step Windows account isolation wizard
        ├── OptionAScriptGen.tsx        # 1-click batch script generator & swapper
        ├── SystemSimulator.tsx         # Visual drive & documents filesystem sandbox
        ├── SafetyMatrix.tsx            # EA AntiCheat & save corruption risk auditor
        ├── UpdateProtocol.tsx          # Patch day protocol & wheel FFB calibration sync
        └── GeminiTroubleshootModal.tsx # AI step troubleshooter powered by Gemini 3.8 Flash
```

---

## 🔐 Safety & Fair Use Notice

- **Anti-Cheat Integrity**: PaddockDual does not inject code into online games. Its primary purpose is **isolation**—guaranteeing that official multiplayer sessions run strictly against unmodified binaries so players never inadvertently violate EA Anti-Cheat terms of service.
- **Fair Play**: DLC unlockers and mod loaders should **never** be used in competitive multiplayer or online ranked leagues. Swofty Launcher is strictly designed for offline single-player career modes and community asset conversions.

---

## 📄 License

Distributed under the **Apache-2.0 License**. See [LICENSE](LICENSE) for more information.
