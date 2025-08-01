
export const databaseSystems = {
  title: "Database Systems",
  slug: "database-systems",
  description: "Learn how data is stored, retrieved, and managed in a structured way using Database Management Systems (DBMS).",
  content: {
    introduction: `
### Introduction
A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A Database Management System (DBMS) is the software that interacts with end users, applications, and the database itself to capture and analyze the data. Databases are at the heart of most applications, from e-commerce sites managing products and orders, to social media platforms handling user profiles and posts. Understanding database systems is essential for building robust, data-driven applications.
    `,
    coreConcepts: `
### Core Concepts

**1. Relational Databases (SQL)**
This has been the dominant model for decades. Data is organized into tables (relations), which consist of rows (tuples) and columns (attributes).
*   **Tables:** A collection of related data entries (e.g., a \`Users\` table, a \`Products\` table).
*   **Primary Key:** A column (or set of columns) that uniquely identifies each row in a table.
*   **Foreign Key:** A key used to link two tables together. It's a field in one table that refers to the Primary Key in another table.
*   **SQL (Structured Query Language):** The standard language for managing and manipulating data in relational databases.
    *   **DDL (Data Definition Language):** Defines the database schema (e.g., \`CREATE TABLE\`, \`ALTER TABLE\`).
    *   **DML (Data Manipulation Language):** Used for adding, updating, and deleting data (e.g., \`INSERT\`, \`UPDATE\`, \`DELETE\`).
    *   **DQL (Data Query Language):** Used for retrieving data (e.g., \`SELECT\`).

**2. Database Normalization**
The process of organizing columns and tables in a relational database to minimize data redundancy.
*   **First Normal Form (1NF):** Ensures that the table is a flat file with no repeating groups.
*   **Second Normal Form (2NF):** Is in 1NF and all non-key attributes are fully functional on the primary key.
*   **Third Normal Form (3NF):** Is in 2NF and all attributes are dependent only on the primary key, not on other non-key attributes.

**3. Transactions and ACID Properties**
A transaction is a single logical unit of work. ACID properties guarantee that database transactions are processed reliably.
*   **Atomicity:** A transaction is an "all or nothing" operation. It either completes fully or is rolled back completely.
*   **Consistency:** A transaction brings the database from one valid state to another.
*   **Isolation:** Concurrent transactions produce the same result as if they were executed sequentially.
*   **Durability:** Once a transaction has been committed, it will remain so, even in the event of power loss or system crash.

**4. NoSQL Databases**
Databases that do not use the relational table model. They are often used for big data and real-time web apps.
*   **Document Databases (e.g., MongoDB):** Store data in JSON-like documents. Flexible schema.
*   **Key-Value Stores (e.g., Redis):** Simple databases where each item is a key-value pair. Very fast.
*   **Column-Family Stores (e.g., Cassandra):** Store data in columns rather than rows. Good for wide datasets.
*   **Graph Databases (e.g., Neo4j):** Designed to store and navigate relationships between entities.

**5. Indexes**
A special lookup table that the database search engine can use to speed up data retrieval. An index is a pointer to data in a table.
    `,
    visualAids: `
### Visual Aids
*   **ERD (Entity-Relationship Diagram):** A flowchart that illustrates how "entities" such as people, objects, or concepts relate to each other within a system. Essential for designing relational databases.
*   **Table Diagrams:** Simple visual representations of tables with rows, columns, primary keys, and foreign keys.
*   **Diagrams:** A diagram showing the difference in structure between a relational table and a NoSQL JSON document.
    `,
    examples: `
### Examples & Use Cases

**Basic SQL Query**
Imagine two tables: \`Students\` (StudentID, Name) and \`Courses\` (CourseID, StudentID, CourseName).
To find the names of all students enrolled in the 'Computer Science 101' course:
\`\`\`sql
SELECT Students.Name
FROM Students
INNER JOIN Courses ON Students.StudentID = Courses.StudentID
WHERE Courses.CourseName = 'Computer Science 101';
\`\`\`

**NoSQL Document Example (MongoDB)**
Instead of joining tables, a document database might store the user and their posts in a single document.
\`\`\`json
{
  "_id": "user123",
  "username": "alice",
  "email": "alice@example.com",
  "posts": [
    {
      "postId": "post001",
      "title": "My first post",
      "content": "Hello world!",
      "timestamp": "2023-10-27T10:00:00Z"
    },
    {
      "postId": "post002",
      "title": "Another post",
      "content": "This is fun.",
      "timestamp": "2023-10-27T11:30:00Z"
    }
  ]
}
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which of the following is NOT an ACID property?
    A) Atomicity
    B) Consistency
    C) Concurrency
    D) Durability

**2. Short Answer:** What is the purpose of a primary key in a relational database table?

**3. SQL Task:** Write an SQL query to select all columns (\`*\`) from a table named \`Products\` where the \`Price\` is greater than 100.
    `,
    summary: `
### Quick Summary
*   **Databases** store data in an organized way, managed by a **DBMS**.
*   **Relational (SQL) databases** use tables, rows, and columns, with strict schemas. **SQL** is the language used to interact with them.
*   **Normalization** is the process of reducing data redundancy in relational databases.
*   **ACID properties** ensure that transactions are reliable.
*   **NoSQL databases** offer more flexibility and are often used for large-scale, unstructured data. Types include Document, Key-Value, Column-Family, and Graph.
    `,
    furtherReading: [
      {
        title: "SQLZoo",
        url: "https://sqlzoo.net/",
        type: "Interactive SQL Tutorial"
      },
      {
        title: "MongoDB University",
        url: "https://learn.mongodb.com/",
        type: "Free NoSQL Courses"
      },
      {
        title: "Database Design for Mere Mortals by Michael J. Hernandez",
        url: "https://www.pearson.com/en-us/subject-catalog/p/database-design-for-mere-mortals/P200000002120/9780136788034",
        type: "Book"
      }
    ]
  }
};