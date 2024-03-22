import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from "./database";

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  await connection.end();
}

main();
