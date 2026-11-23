# Master Prompt: Web-Based Vector Graphics Editor ("Published by Samarth Chougule")

## Role & Objective
Act as a Senior Full-Stack Engineer specializing in vector graphics engines and creative web applications. Architect and build a comprehensive, high-performance web-based vector graphics editor structurally inspired by Adobe Illustrator. The application must be a pure web application (React + TypeScript + Vite + HTML5 Canvas/SVG) deployable directly via GitHub (GitHub Pages / Vercel / Netlify) with zero native mobile/Android Studio dependencies.

## 1. Core Rendering Engine & State Management
- Build an HTML5 Canvas / SVG-based rendering engine supporting mathematical vector path data, including Bezier curves, anchor points, handles, stroke weights, corner/cap styles, and solid/gradient fills.
- Implement a centralized state management system (Zustand / Redux) where selecting any element—a vector path, shape, text node, or raster image—automatically updates the right-hand Properties panel.
- Ensure the Properties panel displays exact coordinates, dimensions (`X`, `Y`, `W`, `H`), rotation, opacity, blend modes, fill/stroke controls, and context-aware actions such as Align, Pathfinder/boolean operations, and typography settings.
- Support core canvas interactions: zooming, panning, artboard management, undo/redo history stack, and non-destructive editing.

## 2. Toolbar & Tooling Specification
Organize the persistent left toolbar with clear tool groupings and keyboard shortcuts covering Illustrator-style workflows:
- **Selection:** Selection Tool (`V`), Direct Selection Tool (`A`) for individual anchor points and curve handles.
- **Drawing & Shapes:** Pen Tool (`P`), Curvature Tool, Rectangle (`M`), Rounded Rectangle, Ellipse (`L`), Polygon, Line (`\`), Star Shape Tools, and Type Tool (`T`).
- **Transformation:** Rotate Tool (`R`), Scale Tool (`S`), and Width/Path modification controls.
- **Painting & Effects:** Eyedropper Tool (`I`), Gradient Tool (`G`), and Mesh/pattern fill controls.
- **Boolean & Layout Operations:** Shape Builder, Pathfinder (Unite, Minus Front, Intersect, Exclude), and Artboard Tool (`Shift+O`).

## 3. Custom Asset Management Engine (Fonts, Textures & Backgrounds)
- Architect a local-first (IndexedDB / LocalStorage) and cloud-synced Asset Repository so users can import, organize, and reuse custom assets.
- Support importing custom fonts (**WOFF, WOFF2, TTF, OTF**) using the browser `FontFace` API and registering them dynamically into the text tool and typography inspector.
- Support importing and managing seamless vector/raster **textures** (e.g., grain, paper, halftone, fabric) and **preset backgrounds / templates**.
- Include a dedicated **Assets Panel** in the UI with drag-and-drop placement onto the canvas and property bindings (such as using textures as shape fills, pattern swatches, or text/shape masks).
- Tie the Asset Manager to the user's profile so custom fonts, textures, and saved assets persist across sessions.

## 4. Authentication & User Workspace Persistence
- Add a clean Sign-In / Account modal accessible from a prominent user profile icon in the top header.
- Support Email/Password sign-in, Google OAuth, and an instant Guest Mode option so users can test the editor immediately without friction.
- Persist user projects, artboards, and custom asset libraries securely to the signed-in user's account (with local storage fallback/sync).

## 5. Branding & UI/UX Direction
- Use a dark, distraction-free creative studio interface (`#1e1e1e` / `#252526` panels, crisp `1px` borders, subtle contrast) favoring clean graphic design proportions.
- Include a permanent, clearly visible signature badge in the top navigation bar reading **"Published by Samarth Chougule"**.
- Structure the codebase cleanly for GitHub repository hosting and automated CI/CD deployment.
