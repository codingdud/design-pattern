# Liskov Substitution Principle (LSP)

> If a function works for a base type, it must work for any derived type — without the caller knowing.

## Problem

Inheriting `Rectangle` into `Square` looks natural but breaks the contract — setting width also silently changes height:

```typescript
// ❌ Square breaks Rectangle's contract
class Rectangle {
  setWidth(w: number)  { this.w = w; }
  setHeight(h: number) { this.h = h; }
  area() { return this.w * this.h; }
}

class Square extends Rectangle {
  setWidth(n: number)  { this.w = this.h = n; } // side effect!
  setHeight(n: number) { this.w = this.h = n; } // side effect!
}
```

## Solution

Give both shapes a common `Shape` interface instead of forcing inheritance:

```typescript
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area() { return this.side * this.side; }
}

// Any code that accepts Shape works correctly with both:
function printArea(shape: Shape) {
  console.log(shape.area());
}
```

## Key Insight

If a child changes the **contract** of its parent, code that works with the parent will break unpredictably with the child.

## Real-world Example

- `PaymentProcessor` base → `CreditCardProcessor`, `GiftCardProcessor`
- Both must honour the same `charge()` contract
