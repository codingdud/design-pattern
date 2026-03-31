//Provides a surrogate or placeholder for another object to control access to it.
class ExpensiveResource{
    private data:number[];
    constructor(){
        console.log("ExpensiveResource: Initialized");
        this.data=this._loadData();
    }
    private _loadData():number[]{
        let data=[];
        console.log("ExpensiveResource: Loading data...");
        for(let i=0;i<1e6;i++){
            data.push(i);
        }
        return data;
    }
    processData():number{
        console.log("ExpensiveResource: Processing data...");
        return this.data.reduce((a,b)=>a+b,0);
    }
}

//proxy class
class ExpensiveResourceProxy{
    private expensiveResource:ExpensiveResource|null=null;
    processData():number{
        if(this.expensiveResource===null){
            this.expensiveResource=new ExpensiveResource();
        }   
        return this.expensiveResource.processData();
    }
}
//usage
const proxy=new ExpensiveResourceProxy();
console.log("Client: Requesting data processing...");
const result=proxy.processData();
console.log(`Client: Data processed result is ${result}`);
console.log("Client: Requesting data processing again...");
const result2=proxy.processData();
console.log(`Client: Data processed result is ${result2}`);