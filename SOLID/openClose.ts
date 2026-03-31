// should be open for extension, but closed for modification" 
// The Open/Closed Principle tells you to add new behavior by extension, not modification.

// class DiscountCalculator {
//   get(price, tier) {
//     switch (tier) {
//       case 'silver': return price * 0.95;
//       case 'gold':   return price * 0.9;
//       case 'platinum': return price * 0.85;
//       default: return price;
//     }
//   }
// }

interface DiscountStrategy {
  apply(price: number): number;
}
class SilverDiscount implements DiscountStrategy {
  apply(price:number) { return price * 0.95; }
}
class GoldDiscount implements DiscountStrategy {
  apply(price:number) { return price * 0.9; }
}
class Checkout {
  constructor(private strategy: DiscountStrategy) {}
  total(price: number) { return this.strategy.apply(price); }
}
const obj=new Checkout(new GoldDiscount())
console.log(obj.total(34))

/*  modification is dangerous, extension is safe. 
In production systems, touching working code is the #1 source of bugs.  */

// E-Commerce Discount System