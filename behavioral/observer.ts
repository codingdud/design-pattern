// Defines a one-to-many dependency between objects so that when one object changes state, 
// all its dependents are notified and updated automatically. 
// This is commonly used in event handling in JavaScript.

class Subeject{
    private observers: Observer[];
    constructor() {
        this.observers=[];
    }
    subscribe(observer: Observer){
        this.observers.push(observer);
    }
    unsubscribe(observer:Observer){
        this.observers=this.observers.filter(obs=>obs!==observer);
    }
    notify(data:any){
        this.observers.forEach(observer=>observer.update(data));
    }   
}
//topics can be news,weather,sports etc and it can have multiple observers like news channel,mobile app,website etc
class NewsAgency extends Subeject{
    private news:any[];
    constructor(){
        super();
        this.news=[];
    }
    addNews(headline:string){
        const newsItem={headline:headline,timestamp:new Date(),id:this.news.length+1};
        this.news.push(newsItem);
        this.notify(newsItem);
    }
    getLatewstNews(){
        return this.news[this.news.length-1];
    }
}        

abstract class Observer{
    name:string;
    constructor(name:string){
        if(this.constructor===Observer){
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name=name;
    }
    update(news:any){
        throw new Error("Method 'update()' must be implemented.");
    }
}
class NewsChannel  extends Observer{
    constructor(name:string){
        super(name);
    }
    update(news:any){
        console.log(`${this.name} broadcasting: "${news.headline}" at ${news.timestamp.toLocaleTimeString()}`);
    }
}
class MobileApp  extends Observer{
    constructor(name:string){
        super(name);
    }
    update(news:any){
        console.log(`${this.name} app notification: "${news.headline}" at ${news.timestamp.toLocaleTimeString()}`);
    }
}
class Website  extends Observer{
    constructor(name:string){
        super(name);
    }
    update(news:any){
        console.log(`${this.name} website update: "${news.headline}" at ${news.timestamp.toLocaleTimeString()}`);
    }
}

// Usage
const agency=new NewsAgency();
const channel1=new NewsChannel("Channel 1");
const app1=new MobileApp("NewsApp");
const website1=new Website("NewsWebsite");
//observers subscribe to the subject [agency] or topic
agency.subscribe(channel1);
agency.subscribe(app1);
agency.subscribe(website1);

agency.addNews("Breaking: New Technology Announced");
