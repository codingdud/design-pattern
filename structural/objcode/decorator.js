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
//Dynamically adds behaviors or responsibilities to objects without modifying their structure.
var BasicCar = /** @class */ (function () {
    function BasicCar() {
        this.descr = "Basic Car";
        this.costValue = 5000;
    }
    BasicCar.prototype.description = function () {
        return this.descr;
    };
    BasicCar.prototype.cost = function () {
        return this.costValue;
    };
    return BasicCar;
}());
var RaceCar = /** @class */ (function (_super) {
    __extends(RaceCar, _super);
    function RaceCar(basecar) {
        var _this = _super.call(this) || this;
        _this.basecar = basecar;
        return _this;
    }
    RaceCar.prototype.description = function () {
        return this.basecar.description() + " Race";
    };
    RaceCar.prototype.cost = function () {
        return this.basecar.cost() * 0.4;
    };
    return RaceCar;
}(BasicCar));
var SubCar = /** @class */ (function (_super) {
    __extends(SubCar, _super);
    function SubCar(basecar) {
        var _this = _super.call(this) || this;
        _this.basecar = basecar;
        return _this;
    }
    SubCar.prototype.description = function () {
        return this.basecar.description() + " SUB";
    };
    SubCar.prototype.cost = function () {
        return this.basecar.cost() * 4;
    };
    return SubCar;
}(BasicCar));
var base = new BasicCar();
var racecr = new RaceCar(base);
console.log(racecr.description(), racecr.cost());
var sub = new SubCar(racecr);
console.log(sub.description(), sub.cost());
console.log(base);
console.log(racecr);
console.log(sub);
