import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.ATLAS_URI || "";
console.log(connectionString);

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connected to MongoDB");
} catch (e) {
  console.error("Error connecting to MongoDB", e);
}

let db = client.db("users");

export default db;