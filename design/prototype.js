/*
DEFINITION:
The Prototype pattern creates new objects by cloning existing objects (prototypes)
instead of creating them from scratch.

WHY USE IT:
- Avoid expensive initialization
- Create objects without knowing their exact type
- Add/remove objects at runtime
- Reduce subclassing

WHEN TO USE:
- Object creation is expensive (DB queries, complex calculations)
- Objects share similar state
- Need to create many similar objects
*/

class CarPrototype {
  constructor(model, year, color) {
    this.model = model;
    this.year = year;
    this.color = color;
  }

  clone() {
    // Create a new object with same prototype
    return Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this)
    );
  }

  display() {
    return `${this.color} ${this.model} (${this.year})`;
  }
}


class User {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address; // nested object
  }

  // Deep clone using JSON (loses methods & special types)
  clone() {
    const cloned = JSON.parse(JSON.stringify(this));
    return Object.assign(new User(), cloned);
  }

  getInfo() {
    return `${this.name}, ${this.age}, ${this.address.city}`;
  }
}
