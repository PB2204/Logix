
export const webDevelopment = {
  title: "Web Development",
  slug: "web-development",
  description: "Learn to build and maintain websites and web applications, from the user's browser to the server's database.",
  content: {
    introduction: `
### Introduction
Web Development involves building, creating, and maintaining websites and web applications that run online on a browser. It can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services. It's a vast field that is typically broken down into two main parts: the front-end (what the user sees and interacts with) and the back-end (the server-side logic and database).
    `,
    coreConcepts: `
### Core Concepts

**1. Front-End Development (Client-Side)**
This focuses on the user interface and user experience – everything the user sees and interacts with in their browser.
*   **HTML (HyperText Markup Language):** The standard markup language for creating the structure and content of web pages.
*   **CSS (Cascading Style Sheets):** The language used to describe the presentation and styling of a document written in HTML. It controls colors, fonts, layout, and more.
*   **JavaScript:** A high-level programming language that enables interactive web pages. It's used for things like form validation, animations, and fetching data from servers without reloading the page.
*   **Front-End Frameworks/Libraries:** Tools that make building complex user interfaces easier.
    *   **React:** A JavaScript library for building user interfaces, developed by Facebook.
    *   **Angular:** A platform and framework for building single-page client applications, developed by Google.
    *   **Vue.js:** A progressive framework for building user interfaces.

**2. Back-End Development (Server-Side)**
This focuses on the server, database, and application logic. It's the engine that powers the front-end.
*   **Server-Side Languages:** Languages that run on the server to process logic, interact with the database, and send data to the client.
    *   **Node.js (with JavaScript):** Allows JavaScript to be run on the server.
    *   **Python (with frameworks like Django or Flask):** Popular for its simplicity and powerful libraries.
    *   **Java (with frameworks like Spring):** Widely used in enterprise-level applications.
    *   **PHP:** A long-standing language specifically for web development, powering systems like WordPress.
*   **Databases:** Where the application's data is stored (e.g., user information, products, posts). Can be SQL (like PostgreSQL, MySQL) or NoSQL (like MongoDB).
*   **APIs (Application Programming Interfaces):** A set of rules and protocols that allow different software applications to communicate with each other. The back-end often exposes an API for the front-end to consume.
    *   **REST (REpresentational State Transfer):** A popular architectural style for designing networked applications, often using JSON as the data format.

**3. Full-Stack Development**
A full-stack developer is comfortable working on both the front-end and back-end parts of an application.

**4. DevOps and Deployment**
*   **DevOps:** A set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development life cycle and provide continuous delivery with high software quality.
*   **Deployment:** The process of making a web application available for use by deploying it to a hosting service (e.g., Vercel, Netlify, AWS, Google Cloud).
    `,
    visualAids: `
### Visual Aids
*   **Client-Server Architecture Diagram:** A simple diagram showing a user's browser (client) making a request to a server, which processes it, interacts with a database, and sends a response back.
*   **The "Web Development Trifecta":** A diagram with three interlocking circles for HTML, CSS, and JavaScript, labeled "Structure", "Style", and "Interactivity".
*   **REST API Flowchart:** A diagram showing an HTTP request (e.g., GET /api/users) and the corresponding JSON response.
    `,
    examples: `
### Examples & Use Cases

**Simple HTML Structure**
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
  <script src="script.js"></script>
</body>
</html>
\`\`\`

**Simple CSS Styling**
\`\`\`css
/* style.css */
body {
  font-family: sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}
\`\`\`

**Simple JavaScript Interaction**
\`\`\`javascript
// script.js
// This example is conceptual, often you'd have a button.
document.addEventListener('click', () => {
  alert('You clicked the page!');
});
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which technology is responsible for the structure and content of a webpage?
    A) CSS
    B) JavaScript
    C) HTML
    D) PHP

**2. Short Answer:** What is the difference between front-end and back-end development?

**3. Task:** Create a simple HTML file with a heading and a button. Using CSS, make the button's background color blue. Using JavaScript, make the heading's text change to "Goodbye!" when the button is clicked.
    `,
    summary: `
### Quick Summary
*   **Web Development** is divided into **Front-End** (client-side) and **Back-End** (server-side).
*   **Front-End** uses **HTML** (structure), **CSS** (style), and **JavaScript** (interactivity). Frameworks like **React** simplify UI development.
*   **Back-End** involves a server-side language (like **Node.js** or **Python**), a database, and an **API** to handle business logic and data.
*   **Full-Stack** developers work on both front-end and back-end.
*   **Deployment** is the process of putting your website online for others to see.
    `,
    furtherReading: [
      {
        title: "Mozilla Developer Network (MDN) Web Docs",
        url: "https://developer.mozilla.org/en-US/docs/Web",
        type: "Documentation (The ultimate reference for web technologies)"
      },
      {
        title: "The Odin Project",
        url: "https://www.theodinproject.com/",
        type: "Free Full-Stack Curriculum"
      },
      {
        title: "CSS-Tricks",
        url: "https://css-tricks.com/",
        type: "Blog & Tutorials (Especially great for CSS)"
      }
    ]
  }
};
`