
export const dataStructures = {
  title: "Data Structures",
  slug: "data-structures",
  description: "Discover how to organize, manage, and store data efficiently to enable effective algorithms.",
  content: {
    introduction: `
### Introduction
A data structure is a specialized format for organizing, processing, retrieving, and storing data. Think of it as a container designed to hold data in a way that makes it easy and efficient to work with. Choosing the right data structure can be the difference between a program that runs in seconds and one that takes hours. They are the fundamental building blocks of complex software, influencing everything from application performance to memory usage.
    `,
    coreConcepts: `
### Core Concepts

**1. Linear Data Structures**
Elements are arranged in a sequential or linear order.
*   **Array:** A collection of items stored at contiguous memory locations.
    *   **Pros:** Fast access to elements using an index (O(1)).
    *   **Cons:** Fixed size, slow insertion and deletion in the middle.
*   **Linked List:** A collection of nodes where each node contains data and a pointer to the next node.
    *   **Pros:** Dynamic size, efficient insertion and deletion.
    *   **Cons:** Slow access to elements (O(n)), as you have to traverse the list.
*   **Stack:** A Last-In, First-Out (LIFO) structure. The last element added is the first one to be removed.
    *   **Operations:** \`push\` (add), \`pop\` (remove), \`peek\` (view top).
    *   **Use Cases:** Function call management (the "call stack"), undo/redo features.
*   **Queue:** A First-In, First-Out (FIFO) structure. The first element added is the first one to be removed.
    *   **Operations:** \`enqueue\` (add), \`dequeue\` (remove), \`front\` (view first).
    *   **Use Cases:** Task scheduling, handling requests in a web server, print job queues.

**2. Non-Linear Data Structures**
Elements are not arranged sequentially.
*   **Tree:** A hierarchical structure with a root node and child nodes.
    *   **Binary Tree:** A tree where each node has at most two children.
    *   **Binary Search Tree (BST):** A sorted binary tree, enabling fast search, insertion, and deletion (average O(log n)).
    *   **Use Cases:** File systems, databases (indexing), organization charts.
*   **Heap:** A specialized tree-based data structure that satisfies the heap property.
    *   **Min-Heap:** The root node is the minimum value.
    *   **Max-Heap:** The root node is the maximum value.
    *   **Use Cases:** Priority queues, heapsort algorithm.
*   **Hash Table (or Hash Map):** A structure that maps keys to values for highly efficient lookups.
    *   **How it works:** Uses a hash function to compute an index into an array of buckets, from which the desired value can be found.
    *   **Pros:** Very fast lookups, insertions, and deletions on average (O(1)).
    *   **Cons:** Potential for "collisions" (multiple keys hashing to the same index), which can degrade performance if not handled well.
*   **Graph:** A set of nodes (vertices) and edges that connect them.
    *   **Use Cases:** Social networks, mapping, network routing. (Covered in more detail in Discrete Math & Algorithms).
    `,
    visualAids: `
### Visual Aids
*   **Diagrams:** Visual representations for Linked Lists, Trees, and Graphs are essential.
*   **Tables:** A table comparing the time complexity (Big O) of operations (access, search, insert, delete) for different data structures is incredibly helpful.
*   **Animations:** Animated GIFs or videos showing how \`push\`/\`pop\` on a stack or \`enqueue\`/\`dequeue\` on a queue work.
    `,
    examples: `
### Examples & Use Cases

**Stack for Reversing a String (Python)**
\`\`\`python
def reverse_string(s):
    stack = []
    # Push all characters onto the stack
    for char in s:
        stack.push(char)
    
    reversed_s = ""
    # Pop all characters to get the reversed string
    while not stack.is_empty():
        reversed_s += stack.pop()
        
    return reversed_s

# Note: This is for demonstration. Python's s[::-1] is much more efficient.
\`\`\`

**Hash Table for Counting Word Frequencies (JavaScript)**
\`\`\`javascript
const text = "hello world hello";
const wordCounts = {}; // Using a plain object as a hash map

const words = text.split(' ');

for (const word of words) {
  if (wordCounts[word]) {
    wordCounts[word]++;
  } else {
    wordCounts[word] = 1;
  }
}

console.log(wordCounts); // { hello: 2, world: 1 }
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which data structure is best suited for implementing a "undo" feature in a text editor?
    A) Queue
    B) Stack
    C) Array
    D) Linked List

**2. Short Answer:** What is a hash collision and why is it a problem? Name one technique to resolve it.

**3. Coding Task:** Implement a Queue class from scratch using two Stacks. Your queue should have \`enqueue\` and \`dequeue\` methods.
    `,
    summary: `
### Quick Summary
*   **Data Structures** organize data for efficient use.
*   **Linear Structures** (Arrays, Linked Lists, Stacks, Queues) store data sequentially.
*   **Non-Linear Structures** (Trees, Heaps, Hash Tables, Graphs) store data hierarchically or in a network.
*   The choice of data structure depends on the specific problem and the operations you need to perform frequently.
*   Understanding the **time complexity** (Big O) of operations is crucial for picking the right structure.
    `,
    furtherReading: [
      {
        title: "GeeksforGeeks: Data Structures",
        url: "https://www.geeksforgeeks.org/data-structures/",
        type: "Tutorials & Articles"
      },
      {
        title: "VisuAlgo",
        url: "https://visualgo.net/en",
        type: "Algorithm & Data Structure Visualizations"
      },
      {
        title: "Cracking the Coding Interview by Gayle Laakmann McDowell",
        url: "https://www.crackingthecodinginterview.com/",
        type: "Book (Excellent for practice)"
      }
    ]
  }
};