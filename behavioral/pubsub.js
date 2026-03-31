// pubsub.js
class PubSub {
   constructor() {
       this.subscribers = [];
   }
   subscribe(subscriber) {
       if (typeof subscriber !== 'function') {
           throw new Error('Subscriber must be a function');
       }
       this.subscribers.push(subscriber);
   }
   unsubscribe(subscriber) {
       this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
   }
   publish(payload) {
       this.subscribers.forEach(subscriber => {
           try {
               subscriber(payload);
           } catch (error) {
               console.error('Error in subscriber:', error);
           }
       });
   }
}

const events = new PubSub();
events.subscribe(msg => console.log('Listener 1:', msg));
events.subscribe(msg => console.log('Listener 2:', msg));
events.publish('Event triggered!');