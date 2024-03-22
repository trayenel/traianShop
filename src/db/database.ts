import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const connection = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "traian",
  password: "traian",
  database: "shop_db",
});

export const db = drizzle(connection, { schema });
