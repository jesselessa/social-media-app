import "dotenv/config";
import mysql from "mysql";

// Configure database
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.REACT_APP_DB_PSWD,
  database: "jessbook",
});

db.connect(function (error) {
  if (error) throw error;
  console.log("Database connected to server");
});
