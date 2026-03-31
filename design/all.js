// ============================================
// DESIGN PATTERNS - INTERVIEW CHEAT SHEET
// ============================================

// ============================================
// 1. CREATIONAL PATTERNS
// Purpose: Object creation mechanisms
// ============================================

// --- CONSTRUCTOR PATTERN ---
// Definition: Uses constructor functions to create objects
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
  getInfo() {
    return `${this.model} (${this.year})`;
  }
}
const car1 = new Car('Tesla', 2023);
console.log('Constructor:', car1.getInfo());


// --- FACTORY PATTERN ---
// Definition: Creates objects without specifying exact class
// Use: When object creation logic is complex
class VehicleFactory {
  static createVehicle(type, model) {
    switch(type) {
      case 'car': return new Car(model, 2023);
      case 'bike': return { type: 'bike', model };
      default: return null;
    }
  }
}
const vehicle = VehicleFactory.createVehicle('car', 'BMW');
console.log('Factory:', vehicle);


// --- SINGLETON PATTERN ---
// Definition: Ensures only ONE instance exists
// Use: Database connections, config managers
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = 'DB Connected';
    Database.instance = this;
  }
  
  getConnection() {
    return this.connection;
  }
}
const db1 = new Database();
const db2 = new Database();
console.log('Singleton:', db1 === db2); // true


// --- PROTOTYPE PATTERN ---
// Definition: Creates objects by cloning existing ones
// Use: When object creation is expensive
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


// ============================================
// 2. STRUCTURAL PATTERNS
// Purpose: Object composition and relationships
// ============================================

// --- MODULE PATTERN ---
// Definition: Encapsulates private/public members
// Use: Namespace management, data hiding
class CounterModule {
  #counter = 0;  // Private field (ES2022+)
  
  #logCounter() {  // Private method
    console.log(`Counter: ${this.#counter}`);
  }
  
  increment() {
    this.#counter++;
    this.#logCounter();
  }
  
  decrement() {
    this.#counter--;
    this.#logCounter();
  }
  
  getCount() {
    return this.#counter;
  }
}

// Usage
const counter1 = new CounterModule();
counter1.increment(); // Counter: 1
counter1.increment(); // Counter: 2
console.log(counter1.getCount()); // 2
//console.log(counter1.#counter); // ❌ SyntaxError: Private field


// --- PROXY PATTERN ---
// Definition: Controls access to another object
// Use: Lazy loading, access control, caching
class RealAPI {
  request(url) {
    return `Fetching: ${url}`;
  }
}

class ProxyAPI {
  constructor() {
    this.api = new RealAPI();
    this.cache = {};
  }
  
  request(url) {
    if (this.cache[url]) {
      return `Cached: ${this.cache[url]}`;
    }
    this.cache[url] = this.api.request(url);
    return this.cache[url];
  }
}
const proxy = new ProxyAPI();
console.log('Proxy:', proxy.request('/api/users'));


// --- COMPOSITE PATTERN ---
// Definition: Treats individual objects and groups of objects uniformly
// Creates tree structures (hierarchies)
// Allows you to work with complex tree structures as if they were simple objects
// Use: Tree structures (DOM, file system)
class Component {
  constructor(name) {
    this.name = name;
  }
}

class Leaf extends Component {
  display() {
    return this.name;
  }
}

class Composite extends Component {
  constructor(name) {
    super(name);
    this.children = [];
  }
  
  add(child) {
    this.children.push(child);
  }
  
  display() {
    return `${this.name}: [${this.children.map(c => c.display()).join(', ')}]`;
  }
}
const root = new Composite('Root');
root.add(new Leaf('Leaf1'));
root.add(new Leaf('Leaf2'));
console.log('Composite:', root.display());


// ============================================
// 3. BEHAVIORAL PATTERNS
// Purpose: Communication between objects
// ============================================

// --- OBSERVER PATTERN ---
// Definition: One-to-many dependency (Subject notifies Observers)
// Use: Event handling, data binding
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} received:`, data);
  }
}
const subject = new Subject();
const obs1 = new Observer('Observer1');
subject.subscribe(obs1);
subject.notify('Hello!');


// --- PUB-SUB PATTERN ---
// Definition: Publishers and Subscribers communicate via Event Channel
// Difference from Observer: Decoupled, uses event channel
class PubSub {
  constructor() {
    this.events = {};
  }
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}
const pubsub = new PubSub();
pubsub.subscribe('login', user => console.log('User logged in:', user));
pubsub.publish('login', { name: 'John' });


// --- CHAIN OF RESPONSIBILITY ---
// Definition: Passes request through chain of handlers
// Use: Middleware, event bubbling, validation
class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }
  
  handle(request) {
    if (this.next) {
      return this.next.handle(request);
    }
    return null;
  }
}

class AuthHandler extends Handler {
  handle(request) {
    if (!request.auth) {
      return 'Auth failed';
    }
    console.log('Auth passed');
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.valid) {
      return 'Validation failed';
    }
    console.log('Validation passed');
    return super.handle(request);
  }
}
const auth = new AuthHandler();
const validation = new ValidationHandler();
auth.setNext(validation);
console.log('Chain:', auth.handle({ auth: true, valid: true }));


// ============================================
// KEY INTERVIEW POINTS
// ============================================
/*
1. Observer vs Pub-Sub:
   - Observer: Subject knows observers (tight coupling)
   - Pub-Sub: Event channel decouples (loose coupling)

2. Factory vs Constructor:
   - Constructor: Direct instantiation
   - Factory: Hides creation logic, returns different types

3. Singleton Use Cases:
   - Database connections, Cache, Config, Logger

4. When to use Proxy:
   - Lazy loading, Access control, Caching, Logging

5. Module Pattern Benefits:
   - Encapsulation, Namespacing, Privacy
*/