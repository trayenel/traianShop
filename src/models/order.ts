import { db } from "../db/database";
import { prods, cart, usr, cartEntries, orders, orderEntries } from "../db/schema";
import { eq, and } from "drizzle-orm";

export default class Order {
  public static async createOrder(usrId: number) {
    return await db.insert(orders).values({ userId: usrId }).returning({ id: orders.id })
  }

  public static async addOrderItems(order: number, itemId: number, itemQty: number) {
    return await db.insert(orderEntries).values({ orderId: order, orderItemId: itemId, qty: itemQty })
  }

  public static async cancelOrder(usrId: number, orderId: number) {
    return await db
      .delete(orders)
      .where(and(eq(orders.userId, usrId), eq(orders.id, orderId)));
  }

  public static async getOrders(userId: number) {
    return await db.select().from(orders).where(eq(orders.userId, userId)).leftJoin(orderEntries, eq(orderEntries.orderId, orders.id)).leftJoin(prods, eq(orderEntries.orderItemId, prods.id))
  }
}
