const sqlite3 = require("sqlite3")
const db = new sqlite3.Database("./devFinances.db")

db.serialize(function() {
    db.run(
        `CREATE TABLE IF NOT EXISTS transactions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT,
          amount TEXT,
          date TEXT
        );
    `)
})

module.exports = db