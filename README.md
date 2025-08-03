
# Logix: Your AI-Powered Learning Companion

<p align="center">
  <strong>Developed & Maintained by <a href="https://mbwebbers.tech">MB WEBBER'S</a></strong><br/>
  <em>Founder & CEO: <a href="https://www.linkedin.com/in/pabitra-banerjee/">Pabitra Banerjee</a></em>
</p>

---

**Logix** is an all-in-one, AI-driven web platform designed to be the ultimate learning companion for computer science students and enthusiasts. It provides a suite of powerful tools to master complex topics, debug code with ease, and access curated study materials in a seamless, interactive environment.

## ✨ Core Features

### 1. **Code Playground**
An interactive environment to write, analyze, and execute code in multiple programming languages.
- **Features:**
  - Multi-language support (C++, Java, Python, JavaScript, etc.).
  - AI-powered code analysis for suggestions on efficiency, bugs, and best practices.
  - Client-side execution for JavaScript and TypeScript for instant feedback.
- **Technology:**
  - **Frontend:** Next.js, React, ShadCN UI
  - **Code Editor:** `react-simple-code-editor` with `prismjs` for syntax highlighting.
  - **AI Backend:** Google's Gemini models via **Genkit** for code analysis and remote execution simulation.

### 2. **Algorithmic Complexity Analysis**
Visually understand the efficiency of your algorithms.
- **Features:**
  - In-depth analysis of Time and Space Complexity (Best, Average, Worst cases).
  - Detailed, line-by-line explanations of why the code has a certain complexity.

### 3. **Unused Code Detection** ⭐ NEW
Keep your codebase clean and optimized with intelligent unused code detection.
- **Features:**
  - Identifies unused files and exports across your TypeScript/JavaScript codebase
  - Next.js-aware analysis that understands framework conventions
  - Web dashboard with visual reports and statistics
  - Command-line interface for CI/CD integration
  - JSON output for automated workflows
- **Technology:**
  - **Static Analysis:** TypeScript Compiler API for accurate parsing
  - **Web Interface:** React dashboard with real-time analysis
  - **CLI Tool:** Node.js script with progress reporting
  - Interactive charts to visualize performance growth with varying input sizes.
- **Technology:**
  - **AI Analysis:** **Genkit** flow prompts an expert AI persona to perform the analysis.
  - **Visualization:** `recharts` library for rendering performance graphs.

### 3. **Logix AI: The CS Chatbot**
An intelligent chatbot trained to provide deeply explained answers to computer science questions.
- **Features:**
  - Conversational history for context-aware follow-up questions.
  - Markdown and code block rendering for clear, readable answers.
  - Custom-trained on its origins, capable of discussing its creator **MB WEBBER'S** and its CEO **Pabitra Banerjee**.
- **Technology:**
  - **AI Engine:** **Genkit** with Google's Gemini.
  - **Prompt Engineering:** The AI's persona and knowledge base are defined in a custom prompt within the Genkit flow.
  - **UI:** A custom chat interface built with React and ShadCN UI components.

### 4. **Comprehensive Study Materials**
A curated library of notes and resources covering key computer science subjects.
- **Features:**
  - Topics ranging from "Intro to Programming" to "Blockchain" and "AI".
  - Each topic includes core concepts, examples, practice questions, and links to further reading.
  - Content is rendered from static TypeScript files for excellent performance and maintainability.
- **Technology:**
  - **Content Management:** Statically typed content objects in TypeScript.
  - **Rendering:** `react-markdown` with `remark-gfm` and `react-syntax-highlighter` for beautiful code rendering.

### 5. **User Authentication & Profiles**
A complete and secure user authentication system.
- **Features:**
  - Secure user signup and login with email and password.
  - Password recovery functionality.
  - User profile page to view and update personal information.
- **Technology:**
  - **Backend:** **Firebase Authentication** for user management and **Firestore** for storing user data.
  - **Security:** Firestore Security Rules ensure users can only access and modify their own data.
  - **State Management:** React Context API (`AuthContext`) manages user state across the application.

## 🚀 Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Toolkit:** [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication & DB:** [Firebase Auth](https://firebase.google.com/docs/auth) & [Firestore](https://firebase.google.com/docs/firestore)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment:** Firebase App Hosting (or any Node.js compatible platform)

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your-repo/logix.git
    cd logix
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase project configuration keys:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) to view it in the browser.

---

<p align="center">
  Made with ❤️ by <strong>MB WEBBER'S</strong>
</p>
