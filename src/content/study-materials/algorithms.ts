
export const algorithms = {
  title: "Algorithms",
  slug: "algorithms",
  description: "Master the art of creating step-by-step procedures to solve computational problems effectively.",
  content: {
    introduction: `
### Introduction
An algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation. It's the 'recipe' that tells a computer exactly what steps to take to get from an input to a desired output. Studying algorithms is not just about memorizing steps; it's about learning different problem-solving strategies and understanding their efficiency. A well-designed algorithm can save significant time and computational resources.
    `,
    coreConcepts: `
### Core Concepts

**1. Algorithm Analysis & Big O Notation**
*   **Time Complexity:** How the runtime of an algorithm grows as the input size grows.
*   **Space Complexity:** How the memory usage of an algorithm grows as the input size grows.
*   **Big O Notation:** A mathematical notation used to describe the limiting behavior of a function when the argument tends towards a particular value or infinity. It describes the worst-case scenario.
    *   **O(1):** Constant time (e.g., accessing an array element by index).
    *   **O(log n):** Logarithmic time (e.g., binary search).
    *   **O(n):** Linear time (e.g., searching an unsorted list).
    *   **O(n log n):** Log-linear time (e.g., efficient sorting algorithms).
    *   **O(n²):** Quadratic time (e.g., simple sorting algorithms like bubble sort).

**2. Sorting Algorithms**
Putting elements of a list in a certain order.
*   **Bubble Sort, Selection Sort, Insertion Sort:** Simple but inefficient (O(n²)). Good for learning.
*   **Merge Sort, Quicksort, Heapsort:** Efficient, divide-and-conquer algorithms (O(n log n)).

**3. Searching Algorithms**
Finding a specific item in a collection.
*   **Linear Search:** Scans the list sequentially. Inefficient (O(n)).
*   **Binary Search:** Efficiently finds an item in a **sorted** list by repeatedly dividing the search interval in half. Very fast (O(log n)).

**4. Graph Algorithms**
Algorithms that operate on graph data structures.
*   **Traversal:** Visiting all the nodes in a graph.
    *   **Breadth-First Search (BFS):** Explores neighbor nodes first (level by level).
    *   **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking.
*   **Shortest Path Algorithms:** Finding the shortest path between two nodes (e.g., Dijkstra's Algorithm, Bellman-Ford).
*   **Minimum Spanning Tree (MST):** Finding a subset of edges that connects all vertices with the minimum total edge weight (e.g., Prim's, Kruskal's).

**5. Algorithmic Paradigms**
General approaches to constructing efficient solutions.
*   **Brute Force:** Trying every possible solution. Simple, but often too slow.
*   **Greedy Algorithms:** Making the locally optimal choice at each stage with the hope of finding a global optimum.
*   **Divide and Conquer:** Breaking a problem into smaller subproblems, solving them recursively, and combining their solutions. (e.g., Merge Sort).
*   **Dynamic Programming:** Breaking a problem down into simpler subproblems and storing the solution to each subproblem so it's only solved once. (e.g., finding Fibonacci numbers).
    `,
    visualAids: `
### Visual Aids
*   **Flowcharts:** To map out the steps of an algorithm.
*   **Comparison Tables:** A table comparing sorting algorithms on time complexity (best, average, worst), space complexity, and stability.
*   **Animations:** Visualizing how algorithms like Quicksort partition an array or how BFS explores a graph is extremely helpful.
    `,
    examples: `
### Examples & Use Cases

**Binary Search (Python)**
\`\`\`python
def binary_search(sorted_list, target):
    left, right = 0, len(sorted_list) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if sorted_list[mid] == target:
            return mid  # Found the target
        elif sorted_list[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1  # Target not in list
\`\`\`

**Dynamic Programming - Fibonacci (JavaScript)**
\`\`\`javascript
// Using memoization to avoid re-computing values
const fibCache = {};

function fib(n) {
  if (n in fibCache) {
    return fibCache[n];
  }
  if (n <= 1) {
    return n;
  }
  
  const result = fib(n - 1) + fib(n - 2);
  fibCache[n] = result;
  return result;
}
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** What is the worst-case time complexity of Binary Search?
    A) O(n)
    B) O(n²)
    C) O(log n)
    D) O(1)

**2. Short Answer:** Explain the core idea behind the "Divide and Conquer" paradigm. Give an example of an algorithm that uses it.

**3. Coding Task:** Implement the Bubble Sort algorithm to sort a list of numbers in ascending order.
    `,
    summary: `
### Quick Summary
*   An **algorithm** is a step-by-step procedure for solving a problem.
*   **Big O Notation** is used to analyze an algorithm's efficiency in terms of time and space.
*   **Searching** and **Sorting** are fundamental algorithmic problems with various solutions of differing efficiency.
*   **Graph algorithms** (like BFS, DFS, Dijkstra's) are crucial for solving network-related problems.
*   **Algorithmic paradigms** (Greedy, Divide and Conquer, Dynamic Programming) are high-level strategies for designing algorithms.
    `,
    furtherReading: [
      {
        title: "Introduction to Algorithms (CLRS) by Cormen, Leiserson, Rivest, and Stein",
        url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
        type: "Book (The definitive reference)"
      },
      {
        title: "LeetCode",
        url: "https://leetcode.com/",
        type: "Coding Practice Platform"
      },
      {
        title: "Khan Academy: Algorithms",
        url: "https://www.khanacademy.org/computing/computer-science/algorithms",
        type: "Free Online Course"
      }
    ]
  }
};
