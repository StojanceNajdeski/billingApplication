import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "billingApplication",
  password: "Deski12@",
  port: 5432,
});

export default pool;
