import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: encodeURIComponent(process.env.DB_USER),
  database: process.env.DATABASE,
  password: encodeURIComponent(process.env.PASSWORD),
});

export default pool;
