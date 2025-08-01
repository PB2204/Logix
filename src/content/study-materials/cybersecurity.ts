
export const cybersecurity = {
  title: "Cybersecurity",
  slug: "cybersecurity",
  description: "Explore the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks.",
  content: {
    introduction: `
### Introduction
Cybersecurity is the technology, processes, and practices designed to protect networks, devices, programs, and data from attack, damage, or unauthorized access. In our increasingly connected world, cybersecurity is more important than ever. It aims to ensure the confidentiality, integrity, and availability of information. A breach can lead to financial loss, reputational damage, and theft of sensitive personal or corporate data.
    `,
    coreConcepts: `
### Core Concepts

**1. The CIA Triad**
A foundational model that guides cybersecurity policies.
*   **Confidentiality:** Ensuring that data is accessible only to authorized individuals. (Achieved through encryption, access control).
*   **Integrity:** Maintaining the consistency, accuracy, and trustworthiness of data over its entire life cycle. (Achieved through hashing, digital signatures).
*   **Availability:** Ensuring that systems and data are accessible to authorized users when needed. (Achieved through redundancy, backups, protection against Denial-of-Service attacks).

**2. Types of Cyber Threats**
*   **Malware (Malicious Software):** Any software intentionally designed to cause damage to a computer, server, client, or computer network.
    *   **Viruses:** Attach to clean files and spread through the system.
    *   **Worms:** Can self-replicate and spread across networks without human help.
    *   **Trojans:** Disguise themselves as legitimate software to trick users into installing them.
    *   **Ransomware:** Encrypts a victim's files and demands a ransom to restore access.
    *   **Spyware:** Secretly records a user's online activity.
*   **Phishing:** The fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in an electronic communication.
*   **Man-in-the-Middle (MitM) Attack:** An attacker secretly intercepts and relays communication between two parties who believe they are directly communicating with each other.
*   **Denial-of-Service (DoS) / Distributed Denial-of-Service (DDoS) Attack:** Overwhelming a system's resources so that it cannot respond to service requests. A DDoS attack uses many distributed devices to launch the attack.
*   **SQL Injection:** An attack that involves inserting a malicious SQL query via the input data from the client to the application.

**3. Security Measures and Best Practices**
*   **Authentication and Authorization:**
    *   **Authentication:** Verifying the identity of a user (e.g., password, biometrics).
    *   **Authorization:** Granting a verified user permission to access specific resources.
    *   **Multi-Factor Authentication (MFA):** Requiring two or more verification methods to gain access.
*   **Encryption:** The process of converting data into a code to prevent unauthorized access.
    *   **Symmetric Encryption:** The same key is used for both encryption and decryption.
    *   **Asymmetric Encryption (Public-Key Cryptography):** Uses a pair of keys: a public key (for encryption) and a private key (for decryption).
*   **Firewalls:** A network security device that monitors incoming and outgoing network traffic and decides whether to allow or block specific traffic based on a defined set of security rules.
*   **Intrusion Detection Systems (IDS) / Intrusion Prevention Systems (IPS):** Tools that monitor network traffic for suspicious activity and issue alerts (IDS) or actively block threats (IPS).
*   **Regular Software Updates:** Patching vulnerabilities in operating systems and applications is one of the most effective security measures.

**4. Ethical Hacking**
The practice of intentionally penetrating a computer system or network to find security vulnerabilities that a malicious hacker could potentially exploit. This helps organizations test their security defenses.
    `,
    visualAids: `
### Visual Aids
*   **CIA Triad Diagram:** A Venn diagram or triangular diagram showing Confidentiality, Integrity, and Availability.
*   **Attack Flowcharts:** Diagrams showing the steps of a Phishing attack or a Man-in-the-Middle attack.
*   **Network Security Diagram:** A diagram of a corporate network showing the placement of firewalls, IDS/IPS, and other security devices.
*   **Encryption Process:** A simple diagram showing plaintext -> (encryption with key) -> ciphertext -> (decryption with key) -> plaintext.
    `,
    examples: `
### Examples & Use Cases

**Phishing Email Example**
An email pretending to be from your bank asks you to "verify your account" by clicking a link. The link leads to a fake website that looks identical to your bank's real site. When you enter your username and password, the attacker captures them.

**SQL Injection Attack**
Imagine a login form with a query like:
\`\`\`sql
SELECT * FROM Users WHERE Username = 'input_username' AND Password = 'input_password';
\`\`\`
An attacker might enter \`' OR '1'='1\` as the username. The query becomes:
\`\`\`sql
SELECT * FROM Users WHERE Username = '' OR '1'='1' AND Password = '...';
\`\`\`
Since \`'1'='1'\` is always true, the condition might pass, and the attacker could gain access without a valid password. (Modern systems use parameterized queries to prevent this).
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which element of the CIA triad ensures that data is accurate and trustworthy?
    A) Confidentiality
    B) Integrity
    C) Availability
    D) Authentication

**2. Short Answer:** What is the difference between a virus and a worm?

**3. Scenario:** You receive an unsolicited email with a link to reset your password for a service you use, but the sender's email address looks slightly strange. What type of attack might this be, and what should you do?
    `,
    summary: `
### Quick Summary
*   **Cybersecurity** protects digital systems and data from malicious attacks.
*   The **CIA Triad** (Confidentiality, Integrity, Availability) is a core security model.
*   Common threats include **Malware**, **Phishing**, **DoS attacks**, and **SQL Injection**.
*   Key defensive measures include strong **Authentication** (especially MFA), **Encryption**, **Firewalls**, and keeping software **updated**.
*   **Ethical hacking** is used to proactively find and fix security weaknesses.
    `,
    furtherReading: [
      {
        title: "OWASP Top Ten Project",
        url: "https://owasp.org/www-project-top-ten/",
        type: "Website (A standard awareness document for web application security)"
      },
      {
        title: "Krebs on Security",
        url: "https://krebsonsecurity.com/",
        type: "Blog (In-depth security news and investigation)"
      },
      {
        title: "TryHackMe",
        url: "https://tryhackme.com/",
        type: "Interactive Learning Platform"
      }
    ]
  }
};
`