// A class should have only one reason to change, meaning it should have only one job or responsibility.

// order.service.ts
// class OrderService {
//   async place(order) {
//     // 1. Persist order
//     // 2. Charge payment
//     // 3. Send confirmation email
//   }
// }
class OrderRepository {
  async save(order:string) { /* DB logic */ }
}

class PaymentGateway {
  async charge(order:string) { /* Billing API */ }
}

class EmailNotifier {
  async send(order:string) { /* SMTP logic */ }
}

class OrderService {
  constructor(
    private repo: OrderRepository,
    private gateway: PaymentGateway,
    private notifier: EmailNotifier
  ) {}

  async place(order:string) {
    await this.repo.save(order);
    await this.gateway.charge(order);
    await this.notifier.send(order);
  }
}

/*  Multiple responsibilities mean multiple teams touching the same file, 
causing merge conflicts, coordination overhead, and higher bug risk.
 SRP reduces the blast radius of changes. */
// EMP
/*  EmployeeData (just data)
SalaryCalculator (payroll logic)
EmployeeRepository (database)
NotificationService (emails) */