import { db } from "../db/database";
import { prods, shopSchema } from "../db/schema";
import { eq } from "drizzle-orm";
import Cart from "./cart";

let products: object[] = [];

export default class Product {
  private title: string;
  private price: number;
  private image: string;
  private description: string;

  constructor(
    title: string,
    price: number,
    image: string,
    description: string,
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  public async save() {
    return await db.insert(prods).values({
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
    });
  }

  public static async editProduct(
    updTitle: string,
    updPrice: number,
    updDesc: string,
    updImage: string,
    productId: string,
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
