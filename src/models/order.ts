import { db } from "../db/database";
import { prods, cart, usr, cartEntries, orders } from "../db/schema";
import { eq, and } from "drizzle-orm";

export default class Order {
  public static async addOrder(userId: number, price: number) {
    return await db.insert(orders).values({ usrId: userId, totalPrice: price });
  }

  public static async cancelOrder(userId: number, orderId: number) {
    return await db
      .delete(orders)
      .where(and(eq(orders.usrId, userId), eq(orders.id, orderId)));
  }

  public static async getOrder(userId: number) {}
}
