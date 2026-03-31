# Dependency Inversion Principle (DIP)

> High-level modules should not depend on low-level modules. Both should depend on **abstractions**.

## Problem

`UserController` is hardwired to `FileLogger`. Swapping to a console or mock logger requires changing the controller:

```typescript
// ❌ High-level depends on low-level concrete
class FileLogger {
  log(msg: string) { /* write to file */ }
}

class UserController {
  constructor() { this.logger = new FileLogger(); } // tightly coupled
  save(user: { name: string }) { this.logger.log(`Saved ${user.name}`); }
}
```

## Solution

Depend on a `Logger` abstraction; inject the implementation:

```typescript
interface Logger {
  log(msg: string): void;
}

class ConsoleLogger implements Logger {
  log(msg: string) { console.log(msg); }
}

class UserController {
  constructor(private logger: Logger) {}
  save(user: { name: string }) { this.logger.log(`Saved ${user.name}`); }
}

// Wiring — swap implementations without touching UserController:
const controller      = new UserController(new ConsoleLogger());
// const fileController  = new UserController(new FileLogger());
// const testController  = new UserController(new MockLogger());
```

## Architecture Diagram

```
┌─────────────────┐
│ UserController  │  ← High-level
└────────┬────────┘
         │ depends on abstraction
         ↓
┌──────────────────────┐
│  Logger (interface)  │  ← Abstraction
└────────┬─────────────┘
         ↑ implements
┌─────────────────┐
│  ConsoleLogger  │  ← Low-level
└─────────────────┘
```

## Key Insight

Without DIP, swapping a low-level detail (e.g. database vendor, email provider) **ripples through** your entire codebase. DIP isolates the blast radius to a single wiring point.

## Real-world Examples

- `EmailService` interface → `SendGridEmailService`, `SESEmailService`
- `FileStorage` interface → `S3Storage`, `AzureBlobStorage`
- `PaymentProcessor` interface → `StripeProcessor`, `PayPalProcessor`
