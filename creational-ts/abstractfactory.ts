// Abstract Factory Pattern is to abstract the process of object creation by 
// defining a family of related factory methods, 
// each responsible for creating a different type of object. 

/* 
    require a abstract class for family 
    mutliple factory class
 */
abstract class UiFactory{
    constructor(){
        if(this.constructor===UiFactory) throw new Error("abstract class cant not be instanciated!");
    }
    createButton(){
        throw new Error("Button should be implemented");
    }
    createInputField(){
        throw new Error("input field should implemented!");
    }
    createTooltip(){
        throw new Error("Tooltip is not implemented");
    }
}

class LightThemFactory extends UiFactory{
    constructor(){
        super()
    }
    createButton(): Button {
        return new LightThemButton();
    }
    createInputField(): InputField {
        return new LightThemInputField();
    }
    createTooltip(): Tooltip {
        return new LightThemTooltip();
    }
}
class DarkThemFactory extends UiFactory{
    constructor(){
        super()
    }
    createButton(): Button {
        return new DarkThemButton();
    }
    createInputField(): InputField {
        return new DarkThemInputField
    }
    createTooltip(): InputField {
        return new DarkThemTooltip
    }
}

class Button{}
class LightThemButton extends  Button{
    constructor(){
        super();
        console.log("light theme button!")
    }
}
class DarkThemButton extends Button{
    constructor(){
        super();
        console.log("Dark theme button!")
    }
}

class InputField{}
class LightThemInputField extends  InputField{
    constructor(){
        super();
        console.log("light theme InputField!")
    }
}
class DarkThemInputField extends InputField{
    constructor(){
        super();
        console.log("Dark theme InputField!")
    }
}

class Tooltip{}
class LightThemTooltip extends  Tooltip{
    constructor(){
        super();
        console.log("light theme Tooltip!")
    }
}
class DarkThemTooltip extends Tooltip{
    constructor(){
        super();
        console.log("Dark theme Tooltip!")
    }
}

const lightbutton=new LightThemFactory().createButton();
const darkbutton=new DarkThemFactory().createButton();