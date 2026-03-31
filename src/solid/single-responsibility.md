# Single Responsibility Principle (SRP)

> A class should have only one reason to change — it should have only one job or responsibility.

## Problem

A single `OrderService` that persists data, charges payment, and sends email is responsible for three unrelated concerns. Three different teams may need to touch the same file, causing merge conflicts and bugs.

```typescript
// ❌ Too many responsibilities
class OrderService {
  async place(order) {
    // 1. Persist order
    // 2. Charge payment
    // 3. Send confirmation email
  }
}
```

## Solution

Split into focused classes, each with a single job:

```typescript
class OrderRepository {
  async save(order: string) { /* DB logic */ }
}

class PaymentGateway {
  async charge(order: string) { /* Billing API */ }
}

class EmailNotifier {
  async send(order: string) { /* SMTP logic */ }
}

class OrderService {
  constructor(
    private repo: OrderRepository,
    private gateway: PaymentGateway,
    private notifier: EmailNotifier
  ) {}

  async place(order: string) {
    await this.repo.save(order);
    await this.gateway.charge(order);
    await this.notifier.send(order);
  }
}
```

## Key Insight

SRP **reduces the blast radius of changes**. When payroll logic changes, only `SalaryCalculator` is touched — not the employee data class or the email notifier.

## Real-world Example

An `Employee` system split into:
- `EmployeeData` — just data
- `SalaryCalculator` — payroll logic
- `EmployeeRepository` — database access
- `NotificationService` — emails
