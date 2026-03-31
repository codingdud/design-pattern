// one instance of calss should exists
class Singleton {
  static #instance: Singleton | null = null;
  private connection: any;
  private constructor() {
    this.connection = this.createConnection();
  }
  static getInstance(): Singleton {
    if (!Singleton.#instance) {
      Singleton.#instance = new Singleton();
    }
    return Singleton.#instance;
  }
  private createConnection() {
    return {
      host: "localhost",
      port: 3000,
      connected: true,
    };
  }
  query(sql: string): string {
    console.log("Executing query:", sql);
    return "query result";
  }
}
// Usage
const db1 = Singleton.getInstance();
const db2 = Singleton.getInstance();
console.log(db1 === db2); // true
console.log(db1.query("SELECT * FROM users"));
