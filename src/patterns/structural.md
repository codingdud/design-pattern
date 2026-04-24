# Structural Design Pattern : 

> Patterns that deal with object composition and identify simple ways have relationships between different objects

## decorator 
//attach new behaviors or responsibilities to objects without modifying their structure. just adding wraper class to the original class and providing new functionalities

```typescript
class coffee{
    constructor(){
        this.desc="this is basic coffee";
        this.cost=0;
    }
    cost(){
        return this.price+5;
    }
}
class SuggarCoffee extends coffee{
    constructor(basic){
        supper()
        this.basic=basic;
    }
    const(){
        return this.basic()+45; 
    }
}
class ChocolateCoffee extends coffee{
    constructor(basic){
        this.basic=basic;
    }
    cost(){
        return this.basic.cost()+10;
    }
}
const basic=new coffee();
const suggar=new SuggarCofffee(basic);
const choco=new ChocolateCoffee(basic);
```
## Adapter
 - **Allows objects with incompatible interfaces to work together by wrapping an object with an interface that the client expects.**

```mermaid
---
config:
  look: handDrawn
  theme: redux
  layout: elk
---
classDiagram
direction BT
    class OldPaymentSystem {
	    +makePayment(amount: number) Object
    }

    class StripPaymentService {
	    +chargeCard(cardNumber: number, amount: number, currency: string) Object
    }

    class ModernPaymentInterface {
	    +paymentProcess(paymentDetails: Object) Object
    }

    class OldPaymentAdapter {
	    +oldSystem: OldPaymentSystem
	    +constructor()
	    +paymentProcess(paymentDetails: Object) Object
    }

    class StripAdapter {
	    +strip: StripPaymentService
	    +constructor()
	    +paymentProcess(paymentDetails: Object) Object
    }

    class PaymentProcess {
	    -adapter: ModernPaymentInterface
	    +constructor(adapter: ModernPaymentInterface)
	    +process(paymentDetails: Object) Object
    }

	<<abstract>> ModernPaymentInterface

	note for OldPaymentSystem "Legacy payment system\nwith different interface"
	note for StripPaymentService "Third-party service\nwith incompatible interface"
	note for ModernPaymentInterface "Target interface that\nclient expects"
	note for OldPaymentAdapter "Adapter: Converts\nOldPaymentSystem to\nModernPaymentInterface"
	note for StripAdapter "Adapter: Converts\nStripPaymentService to\nModernPaymentInterface"
	note for PaymentProcess "Client: Works with\nModernPaymentInterface\nwithout knowing adaptees"

    ModernPaymentInterface <|-- OldPaymentAdapter : implements
    ModernPaymentInterface <|-- StripAdapter : implements
    OldPaymentAdapter o-- OldPaymentSystem : adapts
    StripAdapter o-- StripPaymentService : adapts
    PaymentProcess o-- ModernPaymentInterface : uses
```