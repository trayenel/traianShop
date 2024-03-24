import {
  serial,
  integer,
  text,
  real,
  varchar,
  pgSchema,
} from "drizzle-orm/pg-core";

export const shopSchema = pgSchema("shop");

export const prods = shopSchema.table("products", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => usr.id, { onDelete: "cascade" }),
});

export const usr = shopSchema.table("users", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});

export const cart = shopSchema.table("cart", {
  id: serial("id").notNull().primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => usr.id, { onDelete: "cascade" }),
});

export const cartEntries = shopSchema.table("cartEntries", {
  id: serial("id").notNull().primaryKey(),
  cartId: integer("cartId")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  cartItemId: integer("cartItemId")
    .notNull()
    .references(() => prods.id, { onDelete: "cascade" }),
  qty: integer("qty").notNull(),
});
