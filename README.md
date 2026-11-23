# Vector Studio — Published by Samarth Chougule

A web-based vector graphics editor inspired by Adobe Illustrator, built with **React, TypeScript, Vite, and HTML5/SVG**. Designed to be developed, version-controlled, and deployed directly via **GitHub**.

---

## Key Features
- **Illustrator-Style Dual-Pane UI:** Left persistent toolbar (`V`, `A`, `P`, `M`, `L`, `T`, `R`, `S`, `I`, `G`), central zoomable/pannable artboard canvas, and right context-sensitive Properties inspector.
- **Custom Asset Manager:** Import custom fonts (`.ttf`, `.otf`, `.woff`, `.woff2`), textures, and backgrounds with drag-and-drop canvas support.
- **User Sign-In & Workspace Persistence:** Account modal supporting Email/Password, Google OAuth, and Guest Mode.
- **Permanent Creator Branding:** Top navigation header featuring **"Published by Samarth Chougule"**.

---

## GitHub Setup & Deployment (Web Workflow)

### 1. Push to a New GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Vector Studio by Samarth Chougule"
git branch -M main
git remote add origin https://github.com/<your-username>/vector-studio.git
git push -u origin main
```

### 2. Run Locally in Browser
```bash
npm install
npm run dev
```
Open the local URL shown in your terminal (usually `http://localhost:5173`).

### 3. Automatic Deployment via GitHub Pages
This project includes `.github/workflows/deploy.yml`.
1. Go to your GitHub repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Every push to `main` automatically builds and publishes your web app live.

---

*Published by Samarth Chougule*
