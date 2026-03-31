// builder class have flexbility to create costom instance(or obj) instance based on requirement or predefined requiredment
class Computer{
    static buildcount=0;
    #parts: {[key:string]:string};
    //parts:{};
    //parts:Object;
    constructor(){
        this.#parts={};
    }
    addPart(key:string,value:string){
        this.#parts[key]=value;
    }
    getSpect(){
        return Object.entries(this.#parts).map(([key,value])=>`${key}:${value}`).join("\n");
    }
}
// builder patter use compostion to achive this flexibility
class BuilderComputer{
    computer:Computer;
    constructor(){
        this.computer=new Computer();
    }
    addCPU(cpu:string):BuilderComputer{
        this.computer.addPart("CPU",cpu);
        return this;
    }
    addRAM(ram:string):BuilderComputer{
        this.computer.addPart("RAM",ram);
        return this;
    }
    addStorage(storage:string):BuilderComputer{
        this.computer.addPart("Storage",storage);
        return this;
    }
    addGPU(gpu:string):BuilderComputer{
        this.computer.addPart("GPU",gpu);
        return this;
    }
    addPowersupply(supply:string):BuilderComputer{
        this.computer.addPart("Power Supply",supply);
        return this;
    }
    build(){
        Computer.buildcount++;
        return this.computer;
    }
}
// Director class that knows how to build specific configurations
class ComputerDirector{
    static buildGamingPC(builder:BuilderComputer):Computer{
        return builder
        .addCPU("amd ryzen 9")
        .addRAM("16gb DDR5")
        .addStorage("NVM ssd 1TB")
        .addGPU("nvedia 3080TI")
        .addPowersupply("Ant 120w")
        .build();
    }
    static buildOfficePC():Computer{
        return new BuilderComputer()
        .addCPU("intel i7 12gen")
        .addRAM("32gb DDR4")
        .addStorage("NVM ssd 2TB")
        .addGPU("nan")
        .addPowersupply("Ant 60w")
        .build();
    }
    static buildWorkstationPC():Computer{
        return new BuilderComputer()
        .addCPU("AMD Threadripper PRO 5995WX")
        .addRAM("136gb DDR4")
        .addStorage("NVM ssd 5TB")
        .addGPU("NVIDEA RTX A6000")
        .addPowersupply("Ant 340w")
        .build();
    }
}
const gamePc=ComputerDirector.buildGamingPC(new BuilderComputer())
const office=ComputerDirector.buildOfficePC();
const workstation=ComputerDirector.buildWorkstationPC();
const costom=
console.log("\nGaming PC\n"+gamePc.getSpect());
console.log("\nOffice PC\n"+office.getSpect());
console.log("\nWorkspace PC\n"+workstation.getSpect());
console.log("\ntotal PC build:",Computer.buildcount)
