// provide a simplified interface to a complex subsystem
class CPU{
    freeze(){
        console.log("CPU: process freezeing processs")
    }
    jump(position:string){
        console.log(`CPU: Jumping to position ${position}`)
    }
    execute(){
        console.log('CPU: Executing instructions');
    }
}
class Memory{
    load(position:string,data:string){
        console.log(`Memory: Loading data "${data}" at position ${position}`);
    }
}
class HardDrive {
  read(lba:string, size:number) {
    console.log(`HardDrive: Reading ${size} bytes from LBA ${lba}`);
    return 'boot data';
  }
}
class GPU {
  initialize() {
    console.log('GPU: Initializing graphics processor');
  }
  
  renderBootScreen() {
    console.log('GPU: Rendering boot screen');
  }
}
class PowerSupply {
  turnOn() {
    console.log('PowerSupply: Providing power to components');
  }
  
  turnOff() {
    console.log('PowerSupply: Cutting power to components');
  }
}
class ComputerFacade{
    private cpu:CPU;
    private memory:Memory;
    private hardDrive:HardDrive;
    private gpu:GPU;
    private powerSupply:PowerSupply;
    constructor(){
        this.cpu=new CPU();
        this.memory=new Memory();
        this.hardDrive=new HardDrive();
        this.gpu=new GPU();
        this.powerSupply=new PowerSupply();
    }
    startComputer(){
        this.powerSupply.turnOn();
        this.cpu.freeze();
        const bootData=this.hardDrive.read('0x00',1024);
        this.memory.load('0x00',bootData);
        this.cpu.jump('0x00');
        this.cpu.execute();
        this.gpu.initialize();
        this.gpu.renderBootScreen();
        console.log('ComputerFacade: Computer started successfully!');
    }   
    shutdownComputer(){
        this.powerSupply.turnOff();
        console.log('ComputerFacade: Computer shutdown successfully!');
    }   

}
const computer=new ComputerFacade();
computer.startComputer();
computer.shutdownComputer();
