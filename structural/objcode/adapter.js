//Allows objects with incompatible interfaces to work together by wrapping an object with an interface that the client expects.
// basicaly transforming the current data in to diffrent structure base on upcoming function 
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OldPaymentSystem = /** @class */ (function () {
    function OldPaymentSystem() {
    }
    OldPaymentSystem.prototype.makePayment = function (amount) {
        console.log("Processing payment of ".concat(amount, " through legacy system."));
        return {
            success: true,
            transjectionID: Math.random().toString(36).slice(2, 9)
        };
    };
    return OldPaymentSystem;
}());
var StripPaymentService = /** @class */ (function () {
    function StripPaymentService() {
    }
    StripPaymentService.prototype.chargeCard = function (cardNumber, amount, currency) {
        console.log("Charging ".concat(currency).concat(amount, " to card ").concat(cardNumber));
        return {
            status: "successed",
            chargeId: 'ch_' + Math.random().toString(36).slice(2, 9),
        };
    };
    return StripPaymentService;
}());
var ModernPaymentInterface = /** @class */ (function () {
    function ModernPaymentInterface() {
    }
    ModernPaymentInterface.prototype.paymentProcess = function (paymentDetails) {
        throw new Error("method must be implemented");
    };
    return ModernPaymentInterface;
}());
var OldPaymentAdapter = /** @class */ (function (_super) {
    __extends(OldPaymentAdapter, _super);
    function OldPaymentAdapter() {
        var _this = _super.call(this) || this;
        _this.oldSystem = new OldPaymentSystem();
        return _this;
    }
    OldPaymentAdapter.prototype.paymentProcess = function (paymentDetails) {
        var _a;
        var result = this.oldSystem.makePayment(paymentDetails.amount);
        return {
            status: (_a = result.success) !== null && _a !== void 0 ? _a : "failed",
            transactionId: result.transjectionID,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
        };
    };
    return OldPaymentAdapter;
}(ModernPaymentInterface));
var StripAdapter = /** @class */ (function (_super) {
    __extends(StripAdapter, _super);
    function StripAdapter() {
        var _this = _super.call(this) || this;
        _this.strip = new StripPaymentService();
        return _this;
    }
    StripAdapter.prototype.paymentProcess = function (paymentDetails) {
        var _a;
        var result = this.strip.chargeCard(paymentDetails.cardNumber, paymentDetails.amount, paymentDetails.currency);
        return {
            status: (_a = result.status) !== null && _a !== void 0 ? _a : "failed",
            transactionId: result.chargeId,
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
        };
    };
    return StripAdapter;
}(ModernPaymentInterface));
var PaymentProcess = /** @class */ (function () {
    function PaymentProcess(adapter) {
        this.adapter = adapter;
    }
    PaymentProcess.prototype.process = function (paymentDetails) {
        console.log('Processing payment...');
        return this.adapter.paymentProcess(paymentDetails);
    };
    return PaymentProcess;
}());
var details = { cardNumber: 213412412, amount: 3224, currency: "R" };
console.log(new PaymentProcess(new OldPaymentAdapter()).process(details));
console.log(new PaymentProcess(new StripAdapter()).process(details));
