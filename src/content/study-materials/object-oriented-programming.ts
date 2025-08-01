
export const objectOrientedProgramming = {
  title: "Object-Oriented Programming",
  slug: "object-oriented-programming",
  description: "Understand the paradigm of modeling software around objects and data rather than functions and logic.",
  content: {
    introduction: `
### Introduction
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods). Instead of thinking about a program as a sequence of commands, OOP allows us to model real-world things (like a car, a user, or a bank account) as objects in our code. This approach leads to more organized, reusable, and maintainable software. Languages like Java, C++, Python, and C# are heavily influenced by OOP principles.
    `,
    coreConcepts: `
### Core Concepts

**1. Classes and Objects**
*   **Class:** A blueprint for creating objects. It defines the properties (attributes) and behaviors (methods) that its objects will have. For example, a \`Car\` class could define properties like \`color\` and \`maxSpeed\`, and methods like \`startEngine()\` and \`accelerate()\`.
*   **Object:** An instance of a class. If \`Car\` is the blueprint, then a specific red Ferrari is an object (an instance) created from that blueprint.

**2. The Four Pillars of OOP**
*   **Encapsulation:** The bundling of data (attributes) and the methods that operate on that data into a single unit (a class). It also involves restricting direct access to some of an object's components, which is a key part of data hiding.
    *   **Access Modifiers:** Keywords like \`public\`, \`private\`, and \`protected\` control the visibility of attributes and methods.
*   **Abstraction:** Hiding complex implementation details and showing only the essential features of the object. When you drive a car, you use the steering wheel and pedals; you don't need to know the complex mechanics of the engine. That's abstraction.
*   **Inheritance:** A mechanism where a new class (subclass or derived class) inherits attributes and methods from an existing class (superclass or base class). This promotes code reuse. For example, \`ElectricCar\` and \`Truck\` classes could inherit from a general \`Vehicle\` class.
*   **Polymorphism:** The ability of a message to be displayed in more than one form. It allows objects of different classes to be treated as objects of a common superclass. The most common use of polymorphism is when a parent class reference is used to refer to a child class object.
    *   **Method Overriding:** A subclass provides a specific implementation of a method that is already provided by its parent class.
    *   **Method Overloading:** Defining multiple methods with the same name but with different parameters within the same class.

**3. Other Key Concepts**
*   **Constructor:** A special method for creating and initializing an object instance of that class.
*   **Destructor:** A special method that is automatically called when an object is destroyed.
    `,
    visualAids: `
### Visual Aids
*   **UML (Unified Modeling Language) Class Diagrams:** The standard way to visually represent classes, their attributes, methods, and the relationships between them (like inheritance and association).
*   **Diagrams:** Simple diagrams showing a 'blueprint' (class) and several 'houses' (objects) built from it.
*   **Inheritance Hierarchy:** A tree diagram showing how classes like \`SportsCar\` and \`SUV\` inherit from \`Car\`, which inherits from \`Vehicle\`.
    `,
    examples: `
### Examples & Use Cases

**A Simple Class in Python**
\`\`\`python
class Dog:
    # This is the constructor
    def __init__(self, name, age):
        self.name = name  # Attribute
        self.age = age    # Attribute

    # This is a method
    def bark(self):
        return "Woof!"

# Creating objects (instances) of the Dog class
my_dog = Dog("Rex", 5)
another_dog = Dog("Buddy", 2)

print(f"{my_dog.name} says: {my_dog.bark()}")
# Output: Rex says: Woof!
\`\`\`

**Inheritance in Java**
\`\`\`java
// Superclass
class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

// Subclass
class Cat extends Animal {
    // Method Overriding
    @Override
    public void makeSound() {
        System.out.println("Meow");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Cat myCat = new Cat();
        myAnimal.makeSound(); // Outputs: Some generic animal sound
        myCat.makeSound();    // Outputs: Meow
    }
}
\`\`\`
    `,
    practiceQuestions: `
### Practice Questions

**1. MCQ:** Which OOP principle is primarily about bundling data and methods together?
    A) Inheritance
    B) Polymorphism
    C) Abstraction
    D) Encapsulation

**2. Short Answer:** Explain the difference between a class and an object using a real-world analogy (other than a car or dog).

**3. Coding Task:** Create a \`Shape\` superclass with a method called \`getArea()\`. Then, create two subclasses, \`Circle\` and \`Rectangle\`, that inherit from \`Shape\` and override the \`getArea()\` method to calculate their specific area.
    `,
    summary: `
### Quick Summary
*   **OOP** models software using **objects** and **classes**.
*   A **class** is a blueprint; an **object** is an instance of that blueprint.
*   **Encapsulation** bundles data and methods, hiding complexity.
*   **Abstraction** shows essential features while hiding implementation details.
*   **Inheritance** allows classes to inherit properties and behaviors from other classes, promoting code reuse.
*   **Polymorphism** allows objects to take on many forms, enabling flexibility.
    `,
    furtherReading: [
      {
        title: "Head First Design Patterns by Eric Freeman & Elisabeth Robson",
        url: "https://www.oreilly.com/library/view/head-first-design/0596007124/",
        type: "Book"
      },
      {
        title: "Refactoring.Guru",
        url: "https://refactoring.guru/design-patterns",
        type: "Website / Tutorials"
      },
      {
        title: "Java OOPs Concepts - GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
        type: "Article"
      }
    ]
  }
};
`