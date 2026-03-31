// a factory method base on inpute create a instance of class and return
class Vehicle{
    type:string;
    brand:string;
    model:string;
    constructor(type:string,brand:string,model:string){
        this.type=type;
        this.brand=brand;
        this.model=model;
    }
    getInfo(){
        return `${this.type}: ${this.brand} ${this.model}`;
    }
}
class VechicalFactory{
    static createFactory(type:string,brand:string,model:string){
        switch(type){
            case "car":
                return new Car(type,brand,model);
                break;
            case "truck":
                return new Truck(type,brand,model);
                break;
            case "motercycle":
                return new Motercycle(type,brand,model);
                break;
            default:
                throw new Error("Not vaid type");
        }
    }
}
class Car extends Vehicle{
    doors:number;
    wheels:number;
    constructor(type:string,brand:string,model:string){
        super(type,brand,model);
        this.doors=4;
        this.wheels=4;
    }
    honk(){
        console.log("peep peep!");
    }
}
class Truck extends Vehicle{
    doors:number;
    wheels:number;
    constructor(type:string,brand:string,model:string){
        super(type,brand,model);
        this.doors=2;
        this.wheels=8;
    }
    honk(){
        console.log("honk honk!");
    }
}
class Motercycle extends Vehicle{
    wheels:number;
    constructor(type:string,brand:string,model:string){
        super(type,brand,model);
        this.wheels=2;
    }
    honk(){
        console.log("peep!");
    }
}

const car=VechicalFactory.createFactory("car","honnda","ch34");
const truck=VechicalFactory.createFactory("truck","bmw","d33");
const motercycle=VechicalFactory.createFactory("motercycle","honnda","ch34");
//const defaultvechical=VechicalFactory.createFactory("nan","any","any");
car.honk()
console.log(truck.getInfo())
console.log(motercycle.wheels);

console.log(car,truck,motercycle)





