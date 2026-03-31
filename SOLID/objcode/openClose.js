// should be open for extension, but closed for modification" 
// The Open/Closed Principle tells you to add new behavior by extension, not modification.
class SilverDiscount {
    apply(price) { return price * 0.95; }
}
class GoldDiscount {
    apply(price) { return price * 0.9; }
}
class Checkout {
    constructor(strategy) {
        this.strategy = strategy;
    }
    total(price) { return this.strategy.apply(price); }
}
const obj = new Checkout(new GoldDiscount());
console.log(obj.total(34));
