// Clients should not be forced to depend upon interfaces that they do not use

// interface MediaPlayer {
//   play(file: string): void;
//   record(source: string): void;
//   stream(url: string): void;
// }

// class BasicPlayer implements MediaPlayer {
//   play(file:string) { /* ok */ }
//   record() { throw new Error('Not supported'); }
//   stream() { throw new Error('Not supported'); }
// } 


interface Playable { play(file: string): void; }
interface Recordable { record(source: string): void; }
interface Streamable { stream(url: string): void; }

class BasicPlayer implements Playable {
  play(file:string) { /* ... */ }
}

class ProRecorder implements Playable, Recordable {
  play(file:string) { /* ... */ }
  record(src:string) { /* ... */ }
}

// Printer Management System
// Printable, Scannable, Faxable, Stapleable. 
// Each device class implements only what it physically supports. 