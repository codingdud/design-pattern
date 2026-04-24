# Behavioral Pattern  
> Patterns that focus on communication between objects and the assignment of responsibilities between objects.

## observer
// Defines a one-to-many dependency between objects so that when one object changes state, 
// all its dependents are notified and updated automatically. 
// This is commonly used in event handling in JavaScript.

// step one Sub class with sub ,unSub and notify
// step two Obs class with update
// obs subcribe to sub

```typescript
class Observer{
  constructor(name){
    this.name=name;
  }
  update(data){
    console.log(`${this.name} recived:${data}`)
  }
}

class Subsciption{
  #observer;
  constructor(){
    this.#observer=[];
  }
  sub(obs){
    this.#observer.push(obs);
  }
  unsub(obs){
    this.#observer=#observer.filter(x=>x!==obs);
  }
  notify(data){
    #observer.forEach(x=>{
      x.update(data);
    })
  }
}
const ops1=new Observer("hari")
const ops2=new Observer("kerti")
const subject=new Subscription()
subject.sub(ops1)
subject.sub(ops2);
subject.notify("hello!");
```

// --- PUB-SUB PATTERN ---
// Definition: Publishers and Subscribers communicate via Event Channel
// Difference from Observer: Decoupled, uses event channel

```typescript
class PubSub{
  constructor(){
    this.events={};
  }
  sub(event,cb){
    if(!this.events[event]) this.events[event]=[];
    this.events[event].push(cb)
  }
  unsub(event,cb){
    if(this.events[event]){
      this.events[event].filter(cb1=> cb1!==cb)
    }
  }
  publish(event,data){
    this.events[event].forEach(cb=>cb(data));
  }
}

const pubsub=new PubSub()
pubsub.sub("login",user=>console.log('user is  loginedin',user));
pubsub.publish("login",{name:"rahul"})
```