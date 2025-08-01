# 🤝 Contributing to Logix

Welcome to **Logix** – your AI-powered learning companion!  
We’re thrilled that you’re considering contributing to this project.  
Whether you're a seasoned developer, a student learning to code, or someone passionate about tech education, your contributions are valuable and appreciated.

---

## 📌 Table of Contents

- [💬 How to Contribute](#-how-to-contribute)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🎯 Types of Contributions](#-types-of-contributions)
- [🧪 Testing Guidelines](#-testing-guidelines)
- [📦 Commit Message Format](#-commit-message-format)
- [📄 Code Style Guide](#-code-style-guide)
- [🔒 Code of Conduct](#-code-of-conduct)
- [📫 Questions or Help?](#-questions-or-help)

---

## 💬 How to Contribute

1. **Fork** the repository.
2. **Clone** your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/logix.git
   cd logix
Create a new branch for your fix or feature:

bash
Copy
Edit
git checkout -b feature/your-feature-name
Make your changes!

Commit and push:

bash
Copy
Edit
git commit -m "feat: brief description of your changes"
git push origin feature/your-feature-name
Create a Pull Request from your branch to main.

📁 Project Structure
Here's a brief overview of how the codebase is organized:

bash
Copy
Edit
/app                → Core App Pages (Next.js routing)
/components         → Reusable React Components
/context            → Auth & Global State Management
/lib                → Utility Functions and Helpers
/data               → Static TypeScript Content (Study Material)
/public             → Static Assets (logos, images)
/styles             → Global CSS & Tailwind Config
/genkit             → AI Prompt & Flow Configuration
🚀 Getting Started
Follow the steps from the README.md to set up the project locally.

🎯 Types of Contributions
We welcome all kinds of contributions, including but not limited to:

📚 Fixing typos or improving documentation

🧠 Adding new study material content

⚙️ Fixing bugs or UI issues

✨ Building new features (e.g. code tools, analysis modules)

🧪 Improving AI prompt performance via Genkit

Note: Please open an issue first if you're planning a large change so we can discuss it beforehand!

🧪 Testing Guidelines
We currently focus on manual testing and review:

After any change, run the development server:

bash
Copy
Edit
npm run dev
Ensure there are no build or runtime errors.

For Genkit-related AI flows, test that the prompt logic and response quality is consistent and accurate.

📦 Commit Message Format
We follow Conventional Commits:

yaml
Copy
Edit
<type>: <short summary>

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Formatting, missing semi colons, etc.
- refactor: Code restructure without behavior change
- test: Adding or fixing tests
- chore: Maintenance tasks
Example:

sql
Copy
Edit
feat: add support for time complexity chart animation
📄 Code Style Guide
Language: TypeScript (.ts / .tsx)

Linting: Follow ESLint rules. Run npm run lint before committing.

Formatting: Use Prettier (npm run format).

UI Components: Use ShadCN UI & Tailwind CSS.

Accessibility: Ensure semantic HTML and good accessibility practices.

🔒 Code of Conduct
All contributors are expected to adhere to the Code of Conduct.
Let’s foster a welcoming and respectful environment for everyone. ❤️

📫 Questions or Help?
For any doubts, discussions, or to propose ideas:

📧 Email: pabitra@mbwebbers.tech

🧑‍💻 GitHub: @PB2204

💼 LinkedIn: Pabitra Banerjee

<p align="center"> Made with 💡 by <strong>Team Logix</strong> | Developed & Maintained by <a href="https://mbwebbers.tech">MB WEBBER’S</a> </p> ```
