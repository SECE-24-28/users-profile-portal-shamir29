const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "prisma", "dev.db");
const sqlPath = path.join(__dirname, "prisma", "migrations", "20260607042427_init", "migration.sql");

const db = new Database(dbPath);
const sql = fs.readFileSync(sqlPath, "utf8");
db.exec(sql);
db.close();
console.log("Database initialized at", dbPath);
