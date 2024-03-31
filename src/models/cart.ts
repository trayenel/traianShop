import { db } from "../db/database";
import { prods, cart, usr, cartEntries } from "../db/schema";
import { and, eq, sql } from "drizzle-orm";

export default class Cart {
  public static async addProduct(prodId: number, cartId: number) {
    return await db
      .insert(cartEntries)
      .values({ cartId: cartId, cartItemId: prodId, qty: 1 })
      .onConflictDoUpdate({
        target: cartEntries.cartItemId,
        set: { qty: sql`${cartEntries.qty} + 1` },
      });
  }

  public static async getProduct(prodId: number, cartId: number) {
    return await db
      .select()
      .from(cartEntries)
      .where(
        and(eq(cartEntries.cartId, cartId), eq(cartEntries.cartItemId, prodId)),
      );
  }

  public static async findCart(userId: number) {
    return await db.select().from(cart).where(eq(cart.userId, userId));
  }

  public static async deleteProduct(id: number, cartId: number) {
    return await db
      .delete(cartEntries)
      .where(
        and(eq(cartEntries.cartItemId, id), eq(cartEntries.cartId, cartId)),
      );
  }

  public static async getAllProducs(userId: number) {
    return await db
      .select()
      .from(usr)
      .where(eq(usr.id, userId))
      .leftJoin(cart, eq(cart.userId, userId))
      .innerJoin(cartEntries, eq(cart.id, cartEntries.cartId))
      .innerJoin(prods, eq(prods.id, cartEntries.cartItemId));
  }

  public static async emptyCart(cartId: number) {
    return await db.delete(cartEntries).where(eq(cartEntries.cartId, cartId));
  }
}
