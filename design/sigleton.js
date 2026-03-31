class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = 'DB Connected';
    Database.instance = this;
  }
  
  getConnection() {
    return this.connection;
  }
}
const db1 = new Database();
const db2 = new Database();
console.log('Singleton:', db1 === db2); // true