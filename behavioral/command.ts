abstract class Command{
    constructor(){
        if(this.constructor===Command){
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    abstract execute():void;
    abstract undo():void;
}

class TextEditor{
    private content:string;
    private clipbord:string;
    constructor(){
        this.content="";
        this.clipbord="";
    }
    write(text:string){
        this.content+=text;
    }
    delete(length:number){
        this.content=this.content.slice(0,-length);
    }
    copy(start:number,end:number){
        this.clipbord=this.content.slice(start,end);
    }
    paste(position:number){
        this.content=this.content.slice(0,position)+this.clipbord+this.content.slice(position);
    }
    getContent(){
        return this.content;
    }
}

class WriteCommand extends Command{
    private editor:TextEditor;
    private text:string;
    constructor(editor:TextEditor,text:string){
        super();
        this.editor=editor;
        this.text=text;
    }
    execute(){
        this.editor.write(this.text);
    }   
    undo(){
        this.editor.delete(this.text.length);
    }
}
class DeleteCommand extends Command{
    private editor:TextEditor;
    private length:number;
    private deletedText:string
    constructor(editor:TextEditor,length:number){
        super();
        this.editor=editor;
        this.length=length;
        this.deletedText="";
    }
    execute(){
        this.deletedText=this.editor.getContent().slice(-this.length);
        this.editor.delete(this.length);
    }
    undo(){
        this.editor.write(this.deletedText);
    }
}
class CopyCommand extends Command{
    private editor:TextEditor
    private start:number;
    private end:number;
    constructor(editor:TextEditor,start:number,end:number){
        super();
        this.editor=editor;
        this.start=start;
        this.end=end;
    }
    execute(){
        this.editor.copy(this.start,this.end);
    }
    undo(){
        // Copy operation does not change content, so no action needed on undo
    }
}
class PasteCommand extends Command{
    private editor:TextEditor;
    private position:number;
    constructor(editor:TextEditor,position:number){
        super();
        this.editor=editor;
        this.position=position;
    }
    execute(){
        this.editor.paste(this.position);
    }   
    undo(){
        this.editor.delete(this.editor.getContent().length - this.position);
    }
}
class CommandManager{
    private commandHistory:Command[];
    private currentIndex:number= -1;
    constructor(){
        this.commandHistory=[];
        this.currentIndex= -1;
    }
    executeCommand(command:Command){
        command.execute();
        this.commandHistory.splice(this.currentIndex + 1);
        this.commandHistory.push(command);
        this.currentIndex++;
    }
    undo(){
        if(this.currentIndex >= 0){
            this.commandHistory[this.currentIndex].undo();
            this.currentIndex--;
        }
    }
    redo(){
        if(this.currentIndex + 1 < this.commandHistory.length){
            this.commandHistory[this.currentIndex + 1].execute();
            this.currentIndex++;
        }
    }
}
const editor=new TextEditor();
const commandManager=new CommandManager();
commandManager.executeCommand(new WriteCommand(editor,"Hello, "));
commandManager.executeCommand(new WriteCommand(editor,"world!"));
console.log(editor.getContent()); // Hello, world!
commandManager.undo();
console.log(editor.getContent()); // Hello, 
commandManager.redo();
console.log(editor.getContent()); // Hello, world!
commandManager.executeCommand(new DeleteCommand(editor,6));
console.log(editor.getContent()); // Hello, 
commandManager.undo();
console.log(editor.getContent()); // Hello, world!      
commandManager.executeCommand(new CopyCommand(editor,0,5));
commandManager.executeCommand(new PasteCommand(editor,13));
console.log(editor.getContent()); // Hello, world!Hello