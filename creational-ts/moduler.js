// ❌ IIFE Module Pattern (Old way)
const CounterModuleIIFE = (function() {
  let counter = 0;
  
  function logCounter() {
    console.log(`Counter: ${counter}`);
  }
  
  return {
    increment: function() {
      counter++;
      logCounter();
    },
    decrement: function() {
      counter--;
      logCounter();
    },
    getCount: function() {
      return counter;
    }
  };
})();
CounterModuleIIFE.increment(); // Counter: 1
CounterModuleIIFE.increment(); // Counter: 2
console.log(CounterModuleIIFE.getCount()); // 2

// ✅ ES6 Class with Private Fields (Modern)
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
