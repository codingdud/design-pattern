// High-level modules should not depend on low-level modules

// class FileLogger {
//   log(msg) { /* write to file */ }
// }

// class UserController {
//   constructor() { this.logger = new FileLogger(); }
//   save(user) { this.logger.log(`Saved ${user.name}`); }
// }

interface Logger {
  log(msg: string): void;
}

class ConsoleLogger implements Logger {
  log(msg:string) { console.log(msg); }
}

class UserController {
  constructor(private logger: Logger) {}
  save(user:{name:string}) { this.logger.log(`Saved ${user.name}`); }
}

// Wiring
const controller = new UserController(new ConsoleLogger());

/* const fileController = new UserController(new FileLogger());
const consoleController = new UserController(new ConsoleLogger());
const testController = new UserController(new MockLogger()); */
// ✅ Now we can easily swap implementations:

/* AFTER (Good):
┌─────────────────┐
│ UserController  │ ← High-level
└────────┬────────┘
         │ depends on
         ↓
┌─────────────────┐
│ Logger (interface) │ ← Abstraction
└────────┬────────┘
         ↑ implements
         │
┌─────────────────┐
│  ConsoleLogger  │ ← Low-level 
└────────┬────────┘
*/
// the changes ripple through your entire codebase.
// tight copling
// vender locking

// SaaS Application Database Switch
// Payment Processing (E-commerce)
// PaymentProcessor 

// Cloud Storage
// FileStorage

// Email Notifications
// EmailService

