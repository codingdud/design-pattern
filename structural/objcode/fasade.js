// provide a simplified interface to a complex subsystem
var CPU = /** @class */ (function () {
    function CPU() {
    }
    CPU.prototype.freeze = function () {
        console.log("CPU: process freezeing processs");
    };
    CPU.prototype.jump = function (position) {
        console.log("CPU: Jumping to position ".concat(position));
    };
    CPU.prototype.execute = function () {
        console.log('CPU: Executing instructions');
    };
    return CPU;
}());
var Memory = /** @class */ (function () {
    function Memory() {
    }
    Memory.prototype.load = function (position, data) {
        console.log("Memory: Loading data \"".concat(data, "\" at position ").concat(position));
    };
    return Memory;
}());
var HardDrive = /** @class */ (function () {
    function HardDrive() {
    }
    HardDrive.prototype.read = function (lba, size) {
        console.log("HardDrive: Reading ".concat(size, " bytes from LBA ").concat(lba));
        return 'boot data';
    };
    return HardDrive;
}());
var GPU = /** @class */ (function () {
    function GPU() {
    }
    GPU.prototype.initialize = function () {
        console.log('GPU: Initializing graphics processor');
    };
    GPU.prototype.renderBootScreen = function () {
        console.log('GPU: Rendering boot screen');
    };
    return GPU;
}());
var PowerSupply = /** @class */ (function () {
    function PowerSupply() {
    }
    PowerSupply.prototype.turnOn = function () {
        console.log('PowerSupply: Providing power to components');
    };
    PowerSupply.prototype.turnOff = function () {
        console.log('PowerSupply: Cutting power to components');
    };
    return PowerSupply;
}());
var ComputerFacade = /** @class */ (function () {
    function ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
        this.gpu = new GPU();
        this.powerSupply = new PowerSupply();
    }
    ComputerFacade.prototype.startComputer = function () {
        this.powerSupply.turnOn();
        this.cpu.freeze();
        var bootData = this.hardDrive.read('0x00', 1024);
        this.memory.load('0x00', bootData);
        this.cpu.jump('0x00');
        this.cpu.execute();
        this.gpu.initialize();
        this.gpu.renderBootScreen();
        console.log('ComputerFacade: Computer started successfully!');
    };
    ComputerFacade.prototype.shutdownComputer = function () {
        this.powerSupply.turnOff();
        console.log('ComputerFacade: Computer shutdown successfully!');
    };
    return ComputerFacade;
}());
var computer = new ComputerFacade();
computer.startComputer();
computer.shutdownComputer();
