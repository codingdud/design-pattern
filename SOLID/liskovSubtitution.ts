// If you have a function, that works for a base type, it should work for a derived type

/* class Rectangle {
  setWidth(w)  { this.w = w; }
  setHeight(h) { this.h = h; }
  area()       { return this.w * this.h; }
}

class Square extends Rectangle {
  setWidth(n)  { this.w = this.h = n; }
  setHeight(n) { this.w = this.h = n; }
} */

interface Shape { area(): number; }

class Rectangle implements Shape {
  constructor(private w: number, private h: number) {}
  area() { return this.w * this.h; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area() { return this.side * this.side; }
}

/* . If a child changes the 'contract' of its parent, 
code that works with the parent will break unpredictably with the child. */

// PaymentProcessor 
// CreditCardProcessor 
// GiftCardProcessor 