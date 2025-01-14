import mysql from "mysql";

// Configure database
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) throw new Error(error.message);
  console.log("Database connected to server");
});
