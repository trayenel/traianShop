import { db } from "../db/database";
import { usr, prods } from "../db/schema";
import { eq } from "drizzle-orm";

export default class User {
  public static async findById(usrId: number) {
    return await db.select().from(usr).where(eq(usr.id, usrId));
  }

  public static async getProducts(usrId: number) {
    return await db.select().from(prods).where(eq(prods.userId, usrId));
  }
}
