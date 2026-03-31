//Provides a surrogate or placeholder for another object to control access to it.
var ExpensiveResource = /** @class */ (function () {
    function ExpensiveResource() {
        console.log("ExpensiveResource: Initialized");
        this.data = this._loadData();
    }
    ExpensiveResource.prototype._loadData = function () {
        var data = [];
        console.log("ExpensiveResource: Loading data...");
        for (var i = 0; i < 1e6; i++) {
            data.push(i);
        }
        return data;
    };
    ExpensiveResource.prototype.processData = function () {
        console.log("ExpensiveResource: Processing data...");
        return this.data.reduce(function (a, b) { return a + b; }, 0);
    };
    return ExpensiveResource;
}());
//proxy class
var ExpensiveResourceProxy = /** @class */ (function () {
    function ExpensiveResourceProxy() {
        this.expensiveResource = null;
    }
    ExpensiveResourceProxy.prototype.processData = function () {
        if (this.expensiveResource === null) {
            this.expensiveResource = new ExpensiveResource();
        }
        return this.expensiveResource.processData();
    };
    return ExpensiveResourceProxy;
}());
//usage
var proxy = new ExpensiveResourceProxy();
console.log("Client: Requesting data processing...");
var result = proxy.processData();
console.log("Client: Data processed result is ".concat(result));
console.log("Client: Requesting data processing again...");
var result2 = proxy.processData();
console.log("Client: Data processed result is ".concat(result2));
