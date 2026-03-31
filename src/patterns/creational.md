# Creational Patterns

> Patterns that deal with object creation mechanisms, aiming to create objects in a manner suitable to the situation.

## Singleton

Only one instance of a class should exist throughout the application lifecycle.

```typescript
class Singleton {
  static #instance: Singleton | null = null;

  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b); // true
```

**Use for:** database connection pools, config managers, loggers.

---

## Factory

A factory method creates instances based on input — the caller doesn't need to know the concrete class.

```typescript
class VehicleFactory {
  static create(type: string, brand: string, model: string): Vehicle {
    switch (type) {
      case 'car':        return new Car(type, brand, model);
      case 'truck':      return new Truck(type, brand, model);
      case 'motorcycle': return new Motorcycle(type, brand, model);
      default: throw new Error(`Unknown type: ${type}`);
    }
  }
}

const car = VehicleFactory.create('car', 'Toyota', 'Corolla');
```

**Use for:** UI component libraries, payment processors, notification channels.

---

## Builder

Builder provides flexibility to construct complex objects step-by-step, supporting optional parts and different configurations.

```typescript
class ComputerBuilder {
  private computer = new Computer();

  addCPU(cpu: string): this {
    this.computer.addPart('CPU', cpu);
    return this;
  }
  addRAM(ram: string): this {
    this.computer.addPart('RAM', ram);
    return this;
  }
  addGPU(gpu: string): this {
    this.computer.addPart('GPU', gpu);
    return this;
  }
  build(): Computer {
    return this.computer;
  }
}

const gaming = new ComputerBuilder()
  .addCPU('i9-13900K')
  .addRAM('64GB DDR5')
  .addGPU('RTX 4090')
  .build();
```

**Use for:** query builders, HTTP request builders, test fixtures.

---

## Prototype

Create new objects by cloning an existing instance rather than constructing from scratch.

```typescript
class Shape {
  constructor(public color: string, public x: number, public y: number) {}

  clone(): Shape {
    return new Shape(this.color, this.x, this.y);
  }
}

const original = new Shape('red', 10, 20);
const copy = original.clone();
copy.color = 'blue'; // original is unchanged
```

**Use for:** expensive-to-create objects, game entities, document templates.

---

## Abstract Factory

Produce families of related objects without specifying their concrete classes.

```typescript
interface Button  { render(): void; }
interface Checkbox { check(): void; }

interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WindowsFactory implements UIFactory {
  createButton()   { return new WindowsButton(); }
  createCheckbox() { return new WindowsCheckbox(); }
}

class MacFactory implements UIFactory {
  createButton()   { return new MacButton(); }
  createCheckbox() { return new MacCheckbox(); }
}
```

**Use for:** cross-platform UI toolkits, themed component libraries, database drivers.
