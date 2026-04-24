//attachnew behaviors or responsibilities to objects without modifying their structure. just adding wraper class to the original class and providing new functionalities
class BasicCar{
    private descr:string;
    private costValue:number;
    constructor(){
        this.descr="Basic Car";
        this.costValue=5000;
    }
    public description():string{
        return this.descr;
    }
    public cost():number{
        return this.costValue;
    }
}
class RaceCar extends BasicCar{
    private basecar:BasicCar;
    constructor(basecar:BasicCar){
        super();
        this.basecar=basecar;
    }
    public description(): string {
        return this.basecar.description()+" Race";
    }
    public cost(): number {
        return this.basecar.cost()*0.4;
    }
}
class SubCar extends BasicCar{
    private  basecar:BasicCar;
    constructor(basecar:BasicCar){
        super();
        this.basecar=basecar;
    }
    public description(): string {
        return this.basecar.description()+" SUB";
    }
    public cost(): number {
        return this.basecar.cost()*4;
    }
}
const base=new BasicCar();
const racecr=new RaceCar(base);
console.log(racecr.description(),racecr.cost())
const sub=new SubCar(racecr);
console.log(sub.description(),sub.cost())
console.log(base)
console.log(racecr)
console.log(sub)