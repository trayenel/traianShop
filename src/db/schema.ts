import { serial, text, real, varchar, pgTable, pgSchema } from "drizzle-orm/pg-core";

export const shopSchema = pgSchema("shop");

export const prods = shopSchema.table("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
});

export const usr = shopSchema.table("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});
