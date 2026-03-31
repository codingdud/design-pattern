# Interface Segregation Principle (ISP)

> Clients should not be forced to depend upon interfaces they do not use.

Split large interfaces into smaller, focused ones.

## Problem

A `BasicPlayer` is forced to implement `record` and `stream` it doesn't support:

```typescript
// ❌ Fat interface
interface MediaPlayer {
  play(file: string): void;
  record(source: string): void;
  stream(url: string): void;
}

class BasicPlayer implements MediaPlayer {
  play(file: string) { /* ok */ }
  record() { throw new Error('Not supported'); } // forced!
  stream() { throw new Error('Not supported'); } // forced!
}
```

## Solution

Split into role-specific interfaces:

```typescript
interface Playable   { play(file: string): void; }
interface Recordable { record(source: string): void; }
interface Streamable { stream(url: string): void; }

class BasicPlayer implements Playable {
  play(file: string) { /* ... */ }
}

class ProRecorder implements Playable, Recordable {
  play(file: string)   { /* ... */ }
  record(src: string)  { /* ... */ }
}
```

## Key Insight

Each class implements **only what it physically supports**. No more throwing `NotSupportedException` from required methods.

## Real-world Example

Printer management:
- `Printable`, `Scannable`, `Faxable`, `Stapleable`
- An inkjet implements `Printable` + `Scannable`; a laser-only printer just `Printable`
