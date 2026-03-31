var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Command = /** @class */ (function () {
    function Command() {
        if (this.constructor === Command) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    return Command;
}());
var TextEditor = /** @class */ (function () {
    function TextEditor() {
        this.content = "";
        this.clipbord = "";
    }
    TextEditor.prototype.write = function (text) {
        this.content += text;
    };
    TextEditor.prototype.delete = function (length) {
        this.content = this.content.slice(0, -length);
    };
    TextEditor.prototype.copy = function (start, end) {
        this.clipbord = this.content.slice(start, end);
    };
    TextEditor.prototype.paste = function (position) {
        this.content = this.content.slice(0, position) + this.clipbord + this.content.slice(position);
    };
    TextEditor.prototype.getContent = function () {
        return this.content;
    };
    return TextEditor;
}());
var WriteCommand = /** @class */ (function (_super) {
    __extends(WriteCommand, _super);
    function WriteCommand(editor, text) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.text = text;
        return _this;
    }
    WriteCommand.prototype.execute = function () {
        this.editor.write(this.text);
    };
    WriteCommand.prototype.undo = function () {
        this.editor.delete(this.text.length);
    };
    return WriteCommand;
}(Command));
var DeleteCommand = /** @class */ (function (_super) {
    __extends(DeleteCommand, _super);
    function DeleteCommand(editor, length) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.length = length;
        _this.deletedText = "";
        return _this;
    }
    DeleteCommand.prototype.execute = function () {
        this.deletedText = this.editor.getContent().slice(-this.length);
        this.editor.delete(this.length);
    };
    DeleteCommand.prototype.undo = function () {
        this.editor.write(this.deletedText);
    };
    return DeleteCommand;
}(Command));
var CopyCommand = /** @class */ (function (_super) {
    __extends(CopyCommand, _super);
    function CopyCommand(editor, start, end) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    CopyCommand.prototype.execute = function () {
        this.editor.copy(this.start, this.end);
    };
    CopyCommand.prototype.undo = function () {
        // Copy operation does not change content, so no action needed on undo
    };
    return CopyCommand;
}(Command));
var PasteCommand = /** @class */ (function (_super) {
    __extends(PasteCommand, _super);
    function PasteCommand(editor, position) {
        var _this = _super.call(this) || this;
        _this.editor = editor;
        _this.position = position;
        return _this;
    }
    PasteCommand.prototype.execute = function () {
        this.editor.paste(this.position);
    };
    PasteCommand.prototype.undo = function () {
        this.editor.delete(this.editor.getContent().length - this.position);
    };
    return PasteCommand;
}(Command));
var CommandManager = /** @class */ (function () {
    function CommandManager() {
        this.currentIndex = -1;
        this.commandHistory = [];
        this.currentIndex = -1;
    }
    CommandManager.prototype.executeCommand = function (command) {
        command.execute();
        this.commandHistory.splice(this.currentIndex + 1);
        this.commandHistory.push(command);
        this.currentIndex++;
    };
    CommandManager.prototype.undo = function () {
        if (this.currentIndex >= 0) {
            this.commandHistory[this.currentIndex].undo();
            this.currentIndex--;
        }
    };
    CommandManager.prototype.redo = function () {
        if (this.currentIndex + 1 < this.commandHistory.length) {
            this.commandHistory[this.currentIndex + 1].execute();
            this.currentIndex++;
        }
    };
    return CommandManager;
}());
var editor = new TextEditor();
var commandManager = new CommandManager();
commandManager.executeCommand(new WriteCommand(editor, "Hello, "));
commandManager.executeCommand(new WriteCommand(editor, "world!"));
console.log(editor.getContent()); // Hello, world!
commandManager.undo();
console.log(editor.getContent()); // Hello, 
commandManager.redo();
console.log(editor.getContent()); // Hello, world!
commandManager.executeCommand(new DeleteCommand(editor, 6));
console.log(editor.getContent()); // Hello, 
commandManager.undo();
console.log(editor.getContent()); // Hello, world!      
commandManager.executeCommand(new CopyCommand(editor, 0, 5));
commandManager.executeCommand(new PasteCommand(editor, 13));
console.log(editor.getContent()); // Hello, world!Hello
