
export const discreteMathematics = {
  title: "Discrete Mathematics",
  slug: "discrete-mathematics",
  description: "Explore the mathematical foundation of computer science, focusing on discrete, non-continuous structures.",
  content: {
    introduction: `
### Introduction
Discrete Mathematics is the backbone of computer science. Unlike continuous mathematics (like calculus), it deals with distinct, separate, and countable objects. This makes it directly applicable to the digital world, where data is stored and processed in discrete bits. From designing efficient algorithms and secure networks to building reliable software, the concepts of discrete math—logic, sets, graphs, and combinatorics—are indispensable for any computer scientist.
    `,
    coreConcepts: `
### Core Concepts

**1. Logic and Proofs**
*   **Propositional Logic:** The study of logical statements (propositions) that can be either true or false. It involves logical operators like AND (\`∧\`), OR (\`∨\`), NOT (\`¬\`), and IMPLIES (\`→\`).
*   **Truth Tables:** A way to systematically determine the truth value of a complex logical expression.
*   **Predicate Logic:** An extension of propositional logic that allows for variables and quantifiers (\`∀\` for all, \`∃\` there exists).
*   **Proof Techniques:** Methods to formally prove mathematical statements, such as Direct Proof, Proof by Contradiction, and Proof by Induction.

**2. Set Theory**
*   **Sets:** A collection of distinct objects, considered as an object in its own right. E.g., \`A = {1, 2, 3}\`.
*   **Operations:** Union (\`∪\`), Intersection (\`∩\`), Difference (\`-\`), Complement.
*   **Venn Diagrams:** Visual representations of sets and their relationships.
*   **Power Set:** The set of all subsets of a set.

**3. Graph Theory**
*   **Graphs:** A structure consisting of a set of vertices (or nodes) and a set of edges that connect pairs of vertices.
*   **Types of Graphs:** Directed, Undirected, Weighted, Bipartite.
*   **Key Concepts:** Paths, Cycles, Connectivity, Trees (a special type of graph with no cycles).
*   **Applications:** Modeling networks, social connections, web links, and navigation systems.

**4. Combinatorics (Counting)**
*   **Fundamental Principles:** The Product Rule and Sum Rule for counting outcomes.
*   **Permutations:** Arrangements of objects where order matters.
*   **Combinations:** Selections of objects where order does not matter.
*   **The Pigeonhole Principle:** If you have more pigeons than pigeonholes, at least one hole must contain more than one pigeon. A simple but powerful concept.

**5. Relations and Functions**
*   **Relations:** A set of ordered pairs that defines a relationship between elements of two sets.
*   **Properties of Relations:** Reflexive, Symmetric, Transitive.
*   **Equivalence Relations:** Relations that are reflexive, symmetric, and transitive, used to partition sets into equivalence classes.
    `,
    visualAids: `
### Visual Aids
*   **Truth Tables:** A table showing all possible truth values for a logical expression.
*   **Venn Diagrams:** Overlapping circles to show relationships between sets.
*   **Graph Diagrams:** Nodes and lines to represent vertices and edges, perfect for visualizing graph theory problems.
*   **Decision Trees:** A tree-like model of decisions and their possible consequences.
    `,
    examples: `
### Examples & Use Cases

**Logic in Code**
Conditional statements in programming are a direct application of propositional logic.
\`\`\`javascript
// if (isUserLoggedIn && hasAdminRights) { ... }
// This corresponds to the logical expression: p ∧ q
let isUserLoggedIn = true;
let hasAdminRights = false;

if (isUserLoggedIn && hasAdminRights) {
  console.log("Admin access granted.");
} else {
  console.log("Access denied.");
}
\`\`\`

**Graph Theory in GPS Navigation**
Cities are vertices, and roads are weighted edges (with weights representing distance or travel time). A GPS finds the shortest path between two cities using algorithms like Dijkstra's, which is a core graph theory algorithm.
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which of the following is NOT a property of an equivalence relation?
    A) Reflexive
    B) Symmetric
    C) Associative
    D) Transitive

**2. Short Answer:** A committee of 3 people is to be chosen from a group of 10. Is this a permutation or a combination problem? Why? Calculate the number of possible committees.

**3. Logic Puzzle:** You have two propositions: P = "It is raining," and Q = "I will take an umbrella." Write the logical expression for "If it is raining, then I will take an umbrella."
    `,
    summary: `
### Quick Summary
*   **Discrete Math** is the study of countable structures, fundamental to computer science.
*   **Logic and Proofs** provide the rules for reasoning and formal verification.
*   **Set Theory** is the language used to group and manage collections of objects.
*   **Graph Theory** models networks and relationships, crucial for algorithms and data representation.
*   **Combinatorics** provides the tools for counting and probability, essential for analyzing algorithm performance.
    `,
    furtherReading: [
      {
        title: "Discrete Mathematics and Its Applications by Kenneth H. Rosen",
        url: "https://www.mheducation.com/highered/product/discrete-mathematics-applications-rosen/M9781260091991.html",
        type: "Book (Classic Textbook)"
      },
      {
        title: "MIT OpenCourseWare: Mathematics for Computer Science",
        url: "https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/",
        type: "University Course"
      },
      {
        title: "TrevTutor: Discrete Math Video Series",
        url: "https://www.youtube.com/playlist?list=PLDDGPdw7e6Ag1EIruYPO6DTlGvjL3f2pP",
        type: "Video Series"
      }
    ]
  }
};
`