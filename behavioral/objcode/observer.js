// Defines a one-to-many dependency between objects so that when one object changes state, 
// all its dependents are notified and updated automatically. 
// This is commonly used in event handling in JavaScript.
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
var Subeject = /** @class */ (function () {
    function Subeject() {
        this.observers = [];
    }
    Subeject.prototype.subscribe = function (observer) {
        this.observers.push(observer);
    };
    Subeject.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    Subeject.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer.update(data); });
    };
    return Subeject;
}());
//topics can be news,weather,sports etc and it can have multiple observers like news channel,mobile app,website etc
var NewsAgency = /** @class */ (function (_super) {
    __extends(NewsAgency, _super);
    function NewsAgency() {
        var _this = _super.call(this) || this;
        _this.news = [];
        return _this;
    }
    NewsAgency.prototype.addNews = function (headline) {
        var newsItem = { headline: headline, timestamp: new Date(), id: this.news.length + 1 };
        this.news.push(newsItem);
        this.notify(newsItem);
    };
    NewsAgency.prototype.getLatewstNews = function () {
        return this.news[this.news.length - 1];
    };
    return NewsAgency;
}(Subeject));
var Observer = /** @class */ (function () {
    function Observer(name) {
        if (this.constructor === Observer) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
    }
    Observer.prototype.update = function (news) {
        throw new Error("Method 'update()' must be implemented.");
    };
    return Observer;
}());
var NewsChannel = /** @class */ (function (_super) {
    __extends(NewsChannel, _super);
    function NewsChannel(name) {
        return _super.call(this, name) || this;
    }
    NewsChannel.prototype.update = function (news) {
        console.log("".concat(this.name, " broadcasting: \"").concat(news.headline, "\" at ").concat(news.timestamp.toLocaleTimeString()));
    };
    return NewsChannel;
}(Observer));
var MobileApp = /** @class */ (function (_super) {
    __extends(MobileApp, _super);
    function MobileApp(name) {
        return _super.call(this, name) || this;
    }
    MobileApp.prototype.update = function (news) {
        console.log("".concat(this.name, " app notification: \"").concat(news.headline, "\" at ").concat(news.timestamp.toLocaleTimeString()));
    };
    return MobileApp;
}(Observer));
var Website = /** @class */ (function (_super) {
    __extends(Website, _super);
    function Website(name) {
        return _super.call(this, name) || this;
    }
    Website.prototype.update = function (news) {
        console.log("".concat(this.name, " website update: \"").concat(news.headline, "\" at ").concat(news.timestamp.toLocaleTimeString()));
    };
    return Website;
}(Observer));
// Usage
var agency = new NewsAgency();
var channel1 = new NewsChannel("Channel 1");
var app1 = new MobileApp("NewsApp");
var website1 = new Website("NewsWebsite");
//observers subscribe to the subject [agency] or topic
agency.subscribe(channel1);
agency.subscribe(app1);
agency.subscribe(website1);
agency.addNews("Breaking: New Technology Announced");
