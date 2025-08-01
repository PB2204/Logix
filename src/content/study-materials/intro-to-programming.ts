
export const introToProgramming = {
  title: "Intro to Programming",
  slug: "intro-to-programming",
  description: "Learn the fundamental concepts of programming, the bedrock of all software development.",
  content: {
    introduction: `
### Introduction
Programming is the process of creating a set of instructions that tell a computer how to perform a task. It's the art of turning human ideas into a language that a machine can understand and execute. From the apps on your phone to the websites you visit and the games you play, programming is the foundational skill that powers the digital world. Learning to program is not just about memorizing syntax; it's about developing problem-solving skills, logical thinking, and creativity.
    `,
    coreConcepts: `
### Core Concepts

**1. What is a Programming Language?**
A programming language is a formal language comprising a set of instructions that produce various kinds of output. They are used in computer programming to implement algorithms.
*   **High-Level Languages:** Easier for humans to read and write (e.g., Python, Java, C++). They are closer to human language.
*   **Low-Level Languages:** Closer to machine hardware, providing more control but are harder to work with (e.g., Assembly language).

**2. Variables and Data Types**
Variables are containers for storing data values. Each variable has a data type, which determines the type of data it can hold.
*   **Integer (int):** Whole numbers, e.g., \`10\`, \`-5\`.
*   **Float/Double:** Numbers with a decimal point, e.g., \`3.14\`, \`-0.001\`.
*   **String (str):** A sequence of characters, e.g., \`"Hello, World!"\`.
*   **Boolean (bool):** Represents logical values, either \`true\` or \`false\`.

**3. Control Structures**
These are the building blocks of program logic, allowing you to control the flow of execution.
*   **Sequential:** Code is executed line by line, in order.
*   **Conditional (Selection):** Executes a block of code only if a certain condition is met.
    *   \`if\`: The basic conditional statement.
    *   \`else if\` / \`elif\`: To test multiple conditions.
    *   \`else\`: The default block to execute if no conditions are met.
*   **Loops (Iteration):** Repeats a block of code as long as a condition is true.
    *   \`for\` loop: Iterates over a sequence (like a list or a range of numbers).
    *   \`while\` loop: Repeats as long as its condition is true.

**4. Functions**
A function is a reusable block of code that performs a specific task.
*   **Why use functions?** To organize code, avoid repetition (DRY principle - Don't Repeat Yourself), and make the program more modular.
*   **Parameters/Arguments:** Data you can pass into a function.
*   **Return Value:** The data a function sends back after its execution.

**5. Basic Input and Output (I/O)**
Programs need to interact with the user or other systems.
*   **Output:** Displaying data to the user (e.g., printing to the console).
*   **Input:** Getting data from the user (e.g., reading from the keyboard).
    `,
    examples: `
### Examples & Use Cases

**Variable Declaration (Python)**
\`\`\`python
# Storing a user's name and age
user_name = "Alice"
user_age = 30
is_student = True

print(f"{user_name} is {user_age} years old.")
\`\`\`

**Conditional Logic (JavaScript)**
\`\`\`javascript
let temperature = 25;

if (temperature > 30) {
  console.log("It's a hot day!");
} else if (temperature > 20) {
  console.log("It's a pleasant day.");
} else {
  console.log("It's a bit chilly.");
}
\`\`\`

**A Simple Function (Python)**
\`\`\`python
# A function to greet a person
def greet(name):
  return f"Hello, {name}!"

# Using the function
message = greet("Pabitra")
print(message)  # Output: Hello, Pabitra!
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** What is the primary purpose of a variable in programming?
    A) To end the program
    B) To store and manage data
    C) To repeat a block of code
    D) To make decisions

**2. Short Answer:** Explain the difference between a \`for\` loop and a \`while\` loop in your own words.

**3. Coding Task:** Write a simple program in a language of your choice that asks the user for their name and age, and then prints a message saying whether they are old enough to vote (assume the voting age is 18).
    `,
    summary: `
### Quick Summary
*   **Programming** is about writing instructions for a computer.
*   **Variables** store data, and **data types** define what kind of data they can hold.
*   **Control Structures** (\`if\`, \`else\`, \`for\`, \`while\`) direct the flow of a program.
*   **Functions** are reusable blocks of code that make programs organized and efficient.
*   Basic **Input/Output** allows the program to interact with the user.
    `,
    furtherReading: [
      {
        title: "freeCodeCamp: Learn to Code",
        url: "https://www.freecodecamp.org/",
        type: "Interactive Course"
      },
      {
        title: "Codecademy: Introduction to Programming",
        url: "https://www.codecademy.com/learn/introduction-to-programming",
        type: "Interactive Course"
      },
      {
        title: "Automate the Boring Stuff with Python by Al Sweigart",
        url: "https://automatetheboringstuff.com/",
        type: "Book (Free Online)"
      }
    ]
  }
};
`