import {
  int,
  double,
  text,
  varchar,
  mysqlTable,
  mysqlSchema,
} from "drizzle-orm/mysql-core";

export const shopSchema = mysqlSchema("shop");

export const prods = shopSchema.table("products", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  price: double("price").notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
});
