//Allows objects with incompatible interfaces to work together by wrapping an object with an interface that the client expects.
// basicaly transforming the current obj in to diffrent structure base on upcoming requirements or changes 

class OldPaymentSystem{
    makePayment(amount:number){
        console.log(`Processing payment of ${amount} through legacy system.`)
        return {
            success:true,
            transjectionID:Math.random().toString(36).slice(2,9)
        }
    }
}
class StripPaymentService{
    chargeCard(cardNumber:number,amount:number,currency:string){
        console.log(`Charging ${currency}${amount} to card ${cardNumber}`);
        return {
            status:"successed",
            chargeId:'ch_'+Math.random().toString(36).slice(2,9),
        }
    }
}
abstract class ModernPaymentInterface{
    paymentProcess(paymentDetails:Object):Object{
        throw new Error("method must be implemented");
    }
}
class OldPaymentAdapter extends ModernPaymentInterface{
    public oldSystem:OldPaymentSystem;
    constructor(){
        super()
        this.oldSystem=new OldPaymentSystem();
    }
    paymentProcess(paymentDetails:{cardNumber:number,amount:number,currency:string}): Object {
        const result=this.oldSystem.makePayment(paymentDetails.amount)
        return {
            status:result.success??"failed",
            transactionId:result.transjectionID,
            amount:paymentDetails.amount,
            currency:paymentDetails.currency,
        }
    }
}
class StripAdapter extends ModernPaymentInterface{
    public strip:StripPaymentService;
    constructor(){
        super();
        this.strip=new StripPaymentService();
    }
    paymentProcess(paymentDetails: {cardNumber:number,amount:number,currency:string}): Object {
        const result=this.strip.chargeCard(paymentDetails.cardNumber,paymentDetails.amount,paymentDetails.currency);
        return {
            status:result.status??"failed",
            transactionId:result.chargeId,
            amount:paymentDetails.amount,
            currency:paymentDetails.currency,
        }
    }
}

class PaymentProcess{
    private adapter:ModernPaymentInterface;
    constructor(adapter:ModernPaymentInterface){
        this.adapter=adapter;
    }
    process(paymentDetails:{cardNumber:number,amount:number,currency:string}):Object{
        console.log('Processing payment...');
        return this.adapter.paymentProcess(paymentDetails);
    }
}
let details:{cardNumber:number,amount:number,currency:string}={cardNumber:213412412,amount:3224,currency:"R"}
console.log(new PaymentProcess(new OldPaymentAdapter()).process(details));
console.log(new PaymentProcess(new StripAdapter()).process(details));