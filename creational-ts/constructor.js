class User{
  constructor(name,age){
    this.name=name;
    this.age=age;
  }
  get info(){
    return `${this.name} ${this.age}`
  }
}
console.log(new User("Animesh",24).info)