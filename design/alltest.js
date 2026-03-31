// Design patterns are proven solutions to recurring problems \
// that experienced developers discovered after years of pain.
//creation pattern purpose to create a new object / or 
//constructor pattern - use for create new object using constructor 

class Person{
  constructor(name){
    this.name=name;
  }
  getInfo(){
    console.log(this.name);
  }
}
const obj=new Person("Animesh")
console.log(obj)

// factoory patterns
// create object wothout specifying excat calss

class PesronFactory{
  static CreatePerson(type,model){
    if(type==="car") return Car(model,2003);
    else if (type==="bike") return {type:"bick",model};
    else return new Car("nano",2003);
  }
}

//singleton pattern
// ensure only one instance exist
// database configs

class DataBaseMongo{
  static instance="";
  constructor(){
    if(DataBaseMongo.instance){
      return  DataBaseMongo.instance;
    }
    this.connection="Connected";
    DataBaseMongo.instance=this;
  }
  getConection(){
    console.log(this.connection);
  }
}
// prototype patter - create object by clone existing one

class User1{
  constructor(name,age){
    this.name=name;
    this.age=age;
  }
  clone(){
    const newobj=Object.create(Object.getPrototypeOf(this));
    return Object.assign(newobj,structuredClone(this))
  }
  getInfo(){
    console.log(`${this.name} ${this.age}`)
  }
}
const obj34=new User1("kartik",23);
const obj32=obj34.clone();
console.log(obj34!==obj32)

// structured foucs on object vompostio and realtion ship

// defination ecapsulation private and public memeber

class CounterModule{
  #counter=0;
  #logCount(){
    console.log(this.#counter)
  }
  inc(){
    this.#counter++;
    this.#logCount();
  }
  dec(){
    this.#counter--;
    this.#logCount();
  }
  reset(){
    this.#counter=0;
    this.#logCount();
  }
}
const obj432=new CounterModule();
obj432.dec()
// proxy patterns
// constroc access of another object
// lazy loading ,access control, caching

class RealAPI{
  request(url){
    return `fetching ${url}`;
  }
}
class ProxyAPI{
  constructor(){
    this.api=new RealAPI();
    this.cache={};
  }
  request(url){
    if(this.cache[url]){
      console.log("cached")
      return this.cache[url]
    }else{
      this.cache[url]=this.api.request(url);
      return this.cache[url]
    }
  }
}
const proxy=new ProxyAPI()
console.log(proxy.request("url"))
console.log(proxy.request("url"))


// Definition: compostion pattern is structure pattern Treats individual objects and groups of objects uniformly
// Creates tree structures (hierarchies)
// Allows you to work with complex tree structures as if they were simple objects
// Use: Tree structures (DOM, file system)
class Component{
  constructor(name){
    this.name=name;
  }
}

class Leaf extends Component{
  constructor(name){
    super(name)
  }
  display(){
    console.log(this.name);
  }
}

class Composite extends Component{
  constructor(name){
    super(name);
    this.child=[];
  }
  add(child){
    this.child.push(child);
  }
  display(){
    console.log(this.name);
    this.child.forEach(element => {
      element.display()
    });
  }
}
const root=new Composite("root");
root.add(new Leaf("leaf1"))
root.add(new Leaf("ealf2"))
root.display()

// obeserver pattern si design pattern on -may dependence 
// use event handeloing , nofication data binding

class Subject{
  constructor(){
    this.observers=[]
  }
  sub(observer){
    this.observers.push(observer);
  }
  unsub(observer){
    this.observers=this.observers.filter(e=>e!==observer)
  }
  notify(data){
    this.observers.forEach(observer=>{
      observer.update(data);
    })
  }
}
class Observer{
  constructor(name){
    this.name=name;
  }
  update(data){
    console.log(`${this.name} data:${data}`)
  }
}
const obj23445=new Subject("cricket")
const ob1=new Observer("akit");
obj23445.sub(ob1);
obj23445.notify("run 120");

// pub /sub pub and sub comnucate over event chanel
// decoupled use event chanel
class PubSub{
  constructor(){
    this.events={};
  }
  sub(event,callback){
    if(!this.events[event]){
      this.events[event]=[];
    }
    this.events[event].push(callback)
  }
  unsub(event,callback){
    this.events[event]=this.events[event].filter(cb=>cb!==callback)
  }
  publish(event,data){
    this.events[event].forEach(cb=>{cb(data)})
  }
}

const pubsub=new PubSub();
pubsub.sub("login",(data)=>{console.log(data)})
pubsub.sub("login",(data)=>{console.log(data)})
pubsub.publish("login","akash made update")
// cain of responsibiblity pass resuest throught cain or request
// middleware even bubbling, vailation

class Handler{
  setNext(handeler){
    this.next=handeler;
  }
  handeler(request){
    if(this.next){
      return this.next.handeler(request);
    }
    return null
  }
}
class Auth extends Handler{
  handeler(request){
    if(!request.auth){
      return "Auth fail"
    }
    console.log("Auht success full")
    return super.handeler(request)
  }
}
class Vaild extends Handler{
  handeler(request){
    if(!request.valid){
      return "valid faill"
    }
    console.log("vaid")
    return super.handeler(request)
  }
}
const authtt=new Auth();
const valid=new Vaild();
authtt.setNext(valid)
authtt.handeler({auth:true,valid:true})