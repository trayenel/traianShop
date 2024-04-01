import {
  serial,
  integer,
  text,
  numeric,
  varchar,
  pgSchema,
} from "drizzle-orm/pg-core";

export const shopSchema = pgSchema("shop");

export const prods = shopSchema.table("products", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  price: numeric("price", { precision: 5, scale: 2 }).notNull(),
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
  id: serial("id").notNull(),
  cartId: integer("cartId")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  cartItemId: integer("cartItemId")
    .notNull()
    .primaryKey()
    .references(() => prods.id, { onDelete: "cascade" }),
  qty: integer("qty").notNull(),
});

export const orderEntries = shopSchema.table("orderEntries", {
  id: serial("id").notNull().primaryKey(),
  orderId: integer("orderId")
    .notNull()
    .references(() => orders.id),
  orderItemId: integer("orderItemId")
    .notNull()
    .references(() => prods.id, { onDelete: "cascade" }),
  qty: integer("qty").notNull(),
});

export const orders = shopSchema.table("orders", {
  id: serial("id").primaryKey().notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => usr.id),
});
