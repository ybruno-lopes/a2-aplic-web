const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database("./database.db");

database.run(`CREATE TABLE IF NOT EXISTS cadastro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    destino TEXT
  )
`)

module.exports = database;