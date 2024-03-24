import { db } from "../db/database";
import { prods } from "../db/schema";
import { eq } from "drizzle-orm";
import Cart from "./cart";

export default class Product {
  private title: string;
  private price: number;
  private image: string;
  private description: string;
  private ownerId: number;

  constructor(
    title: string,
    price: number,
    image: string,
    description: string,
    ownerId: number,
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.ownerId = ownerId;
  }

  public async save() {
    return await db.insert(prods).values({
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      userId: this.ownerId,
    });
  }

  public static async editProduct(
    updTitle: string,
    updPrice: number,
    updDesc: string,
    updImage: string,
    productId: number,
  ) {
    return await db
      .update(prods)
      .set({
        title: updTitle,
        price: updPrice,
        description: updDesc,
        image: updImage,
      })
      .where(eq(prods.id, productId));
  }

  public static async fetchAll() {
    return await db.select().from(prods);
  }

  public static async deleteProduct(productId: string) {
    return await db.delete(prods).where(eq(prods.id, productId));
  }

  public static async findById(id: string) {
    return await db.select().from(prods).where(eq(prods.id, id));
  }
}
