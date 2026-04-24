// one instance of calss should exists
class Singleton {
    static #instance = null;
    constructor() {
        this.connection = this.createConnection();
    }
    static getInstance() {
        if (!Singleton.#instance) {
            Singleton.#instance = new Singleton();
        }
        return Singleton.#instance;
    }
    createConnection() {
        return {
            host: "localhost",
            port: 3000,
            connected: true,
        };
    }
    query(sql) {
        console.log("Executing query:", sql);
        return "query result";
    }
}
// Usage
const db3 = new Singleton();
const db1 = Singleton.getInstance();
const db2 = Singleton.getInstance();
console.log(db1 === db2); // true
console.log(db1.query("SELECT * FROM users"));
