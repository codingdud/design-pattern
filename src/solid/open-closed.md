# Open / Closed Principle (OCP)

> Software entities should be **open for extension**, but **closed for modification**.

Add new behavior by extending — not by editing working code.

## Problem

Every new discount tier requires touching (and potentially breaking) the existing switch statement:

```typescript
// ❌ Closed for extension, open to breakage
class DiscountCalculator {
  get(price: number, tier: string) {
    switch (tier) {
      case 'silver':   return price * 0.95;
      case 'gold':     return price * 0.9;
      case 'platinum': return price * 0.85;
      default: return price;
    }
  }
}
```

## Solution

Define a strategy interface; add new tiers by adding new classes:

```typescript
interface DiscountStrategy {
  apply(price: number): number;
}

class SilverDiscount implements DiscountStrategy {
  apply(price: number) { return price * 0.95; }
}

class GoldDiscount implements DiscountStrategy {
  apply(price: number) { return price * 0.9; }
}

// Adding platinum requires ZERO changes to existing code:
class PlatinumDiscount implements DiscountStrategy {
  apply(price: number) { return price * 0.85; }
}

class Checkout {
  constructor(private strategy: DiscountStrategy) {}
  total(price: number) { return this.strategy.apply(price); }
}

const checkout = new Checkout(new GoldDiscount());
console.log(checkout.total(100)); // 90
```

## Key Insight

**Modification is dangerous, extension is safe.** In production systems, touching working code is the #1 source of regressions.
