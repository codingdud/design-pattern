// --- FACTORY PATTERN ---
// Factory creates objects without exposing creation logic
// Use: When object creation logic is complex
class Car {
  constructor(type) {
    this.type = type;
  }
}

class CarFactory {
  static createCar(type) {
    switch(type) {
      case 'sedan': return new Car('Sedan');
      case 'suv': return new Car('SUV');
      default: return new Car('Hatchback');
    }
  }
}

const car = CarFactory.createCar('sedan');