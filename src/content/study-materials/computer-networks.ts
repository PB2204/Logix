
export const computerNetworks = {
  title: "Computer Networks",
  slug: "computer-networks",
  description: "Learn how computers connect and communicate, from your local home network to the global internet.",
  content: {
    introduction: `
### Introduction
A computer network is a set of computers sharing resources located on or provided by network nodes. The computers use common communication protocols over digital interconnections to communicate with each other. From sending an email to streaming a video, almost everything we do online relies on the principles of computer networking. This field covers the hardware, protocols, and software that make this intricate web of communication possible.
    `,
    coreConcepts: `
### Core Concepts

**1. The OSI and TCP/IP Models**
These are conceptual frameworks that standardize the functions of a telecommunication or computing system in layers of abstraction.
*   **OSI Model (7 Layers):** Physical, Data Link, Network, Transport, Session, Presentation, Application.
*   **TCP/IP Model (4 or 5 Layers):** A more practical model used for the internet.
    *   **Link Layer:** Handles physical transmission (e.g., Ethernet, Wi-Fi).
    *   **Internet Layer (IP):** Handles addressing and routing of packets (e.g., IP addresses).
    *   **Transport Layer (TCP/UDP):** Provides host-to-host communication services for applications.
    *   **Application Layer (HTTP, FTP, etc.):** Network protocols and interface methods used by host computers.

**2. Core Protocols**
*   **IP (Internet Protocol):** The principal communications protocol for relaying datagrams across network boundaries. Its primary task is addressing hosts.
    *   **IPv4 vs. IPv6:** Two versions of the protocol, with IPv6 created to solve the shortage of IPv4 addresses.
*   **TCP (Transmission Control Protocol):** Provides reliable, ordered, and error-checked delivery of a stream of octets between applications. It establishes a connection before sending data. Used for web browsing, email, and file transfers.
*   **UDP (User Datagram Protocol):** A simpler, connectionless protocol. It's faster but doesn't guarantee delivery or order. Used for video streaming, online gaming, and DNS.
*   **HTTP/HTTPS (Hypertext Transfer Protocol/Secure):** The foundation of data communication for the World Wide Web.
*   **DNS (Domain Name System):** The internet's phonebook. It translates human-readable domain names (like \`www.google.com\`) into machine-readable IP addresses.

**3. Networking Hardware**
*   **Router:** A device that forwards data packets between computer networks, creating an overlaying inter-network. Routers direct traffic on the internet.
*   **Switch:** A device that connects devices on a local area network (LAN) and uses MAC addresses to forward data to the correct destination device.
*   **Hub:** An older, less intelligent device that connects devices on a LAN. It broadcasts data to all connected devices, unlike a switch.
*   **Modem:** Modulator-Demodulator. A device that converts digital signals from your computer into analog signals for transmission over phone lines, and vice versa.

**4. Network Topologies**
The arrangement of the elements (links, nodes, etc.) of a communication network.
*   **Star:** All nodes are connected to a central hub or switch.
*   **Bus:** All nodes are connected to a single central cable.
*   **Ring:** Each node is connected to exactly two other nodes, forming a single continuous pathway for signals.
*   **Mesh:** Every node is connected to every other node (full mesh) or to several others (partial mesh). Highly reliable.
    `,
    visualAids: `
### Visual Aids
*   **Layered Model Diagrams:** Side-by-side diagrams of the OSI and TCP/IP models, showing which protocols exist at each layer.
*   **Packet Flow Animation:** A diagram showing how a piece of data (like an email) is encapsulated with headers at each layer (Application -> Transport -> Network -> Link) before being sent.
*   **Network Topology Diagrams:** Simple visual layouts for Star, Bus, Ring, and Mesh topologies.
    `,
    examples: `
### Examples & Use Cases

**The Journey of a Web Request**
1.  **You type \`google.com\` in your browser (Application Layer):** Your browser creates an HTTP GET request.
2.  **DNS Lookup:** Your computer asks a DNS server for the IP address of \`google.com\`.
3.  **TCP Handshake (Transport Layer):** Your computer establishes a reliable TCP connection with Google's server at its IP address.
4.  **IP Packet Creation (Network Layer):** The HTTP request (inside a TCP segment) is placed into an IP packet, which includes the source IP (yours) and destination IP (Google's).
5.  **Ethernet Frame (Link Layer):** The IP packet is placed in a frame and sent over your local network (e.g., Wi-Fi).
6.  **Routing:** Your router receives the frame and sends the packet on its journey across the internet, from router to router, until it reaches Google's server.
7.  **The process reverses:** Google's server sends back the webpage content, which travels back across the internet to your browser.

**TCP vs. UDP**
*   **Use TCP for:** Downloading a file. You need every single piece of the file, in the correct order, for it to work. Reliability is key.
*   **Use UDP for:** A live video call. If a few packets are dropped, it's better to just skip them and show the next available frame to keep the call going in real-time. Speed is key.
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which layer of the TCP/IP model is responsible for routing packets from a source host to a destination host?
    A) Application Layer
    B) Transport Layer
    C) Internet Layer
    D) Link Layer

**2. Short Answer:** What is the main difference between TCP and UDP? Give one example use case for each.

**3. Problem:** You are setting up a small office network with 10 computers and a single printer. You want all devices to be able to communicate with each other and you want to minimize the impact of a single cable failure. Which network topology would be most suitable and why?
    `,
    summary: `
### Quick Summary
*   **Computer Networks** allow computers to communicate and share resources.
*   The **TCP/IP model** provides a layered framework for understanding network communication.
*   **IP** handles addressing, while **TCP** (reliable) and **UDP** (fast) handle data transport.
*   **DNS** translates human-friendly domain names into IP addresses.
*   **Hardware** like routers and switches direct traffic, while **topologies** define the network's layout.
    `,
    furtherReading: [
      {
        title: "Computer Networking: A Top-Down Approach by Kurose and Ross",
        url: "https://www.pearson.com/en-us/subject-catalog/p/computer-networking-a-top-down-approach/P200000002191/9780136681557",
        type: "Book (A classic, accessible textbook)"
      },
      {
        title: "Professor Messer's CompTIA Network+ Training Course",
        url: "https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/",
        type: "Video Course (Comprehensive and free)"
      },
      {
        title: "Wireshark",
        url: "https://www.wireshark.org/",
        type: "Tool (A powerful network protocol analyzer)"
      }
    ]
  }
};
`