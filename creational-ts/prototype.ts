//Creates objects based on a template of an existing object through cloning.
//deep clone can be done using structrueClone or Deep copy recusion function 
/* 
let seen=new WeakMap();
function deepcopy(obj){
    if(typeof obj!=="object"||obj===null) return obj;
    if(seen.has(obj)) return seen.get(obj);
    if(Array.isArray(obj)){
        seen.set(obj,obj.map(deepcopy));
        return seen.get(obj);
    }
    const temp={};
    for([key,value] of Object.entries(obj)){
        temp[key]=deepcopy(value);
    }
    seen.set(obj,temp);
    return temp;
}
structuredClone(obj);
 */
class ShapePrototype{
    public x:number;
    public y:number;
    color:string;
    constructor(){
        this.x=0;
        this.y=0;
        this.color="#11111";
    }
    clone(){
        let proto=Object.create(Object.getPrototypeOf(this))
        console.log(this)
        return Object.assign(proto,structuredClone(this));
    }
    move(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    setColor(color:string){
        this.color=color;
    }
}
class Rectangle extends ShapePrototype{
    public width:number; 
    height:number;
    constructor(width=0,height=0){
        super();
        this.width=width;
        this.height=height;
    }
    getArea(){
        return this.width*this.height;
    }
}
class Square extends ShapePrototype{
    public side:number; 
    static{
        console.log("instance yet to be create")
    }
    constructor(side=0){
        super();
        this.side=side;
    }
    getArea(){
        return this.side*this.side;
    }
}
class Circle extends ShapePrototype{
    public radious:number; 
    constructor(radious=0){
        super();
        this.radious=radious;
    }
    getArea(){
        return 2*Math.PI*this.radious*this.radious;
    }
}
class Registery{
    // Initialize the static field directly with an empty object
    static #reg: {[key:string]: ShapePrototype} = {};
    
    static register(name:string, shape:ShapePrototype){
        Registery.#reg[name] = shape;
    }
    
    static createShape(name:string){
        const prototype = Registery.#reg[name];
        if(!prototype) throw new Error(`${name} not found in registery`);
        return prototype.clone();
    }
}

const rect = new Rectangle(12,23);
rect.setColor("#123234");
Registery.register("red-rectangle", rect);

const quare = new Square(12);
quare.setColor("#1111");
Registery.register("black-square", quare);

const circle = new Circle(2.3);
circle.setColor("#5555");
Registery.register("blue-circle", circle);

const rect1 = Registery.createShape("red-rectangle");
rect1.move(2,3);
const square1 = Registery.createShape("black-square");
const circle1 = Registery.createShape("blue-circle");
console.log(rect1, square1, circle1);
