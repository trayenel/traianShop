import { db } from "../db/database";
import { prods } from "../db/schema";
import { eq } from "drizzle-orm";
import Cart from "./cart";

let products: object[] = [];

export default class Product {
  private title: string;
  private price: number;
  private image: string;
  private description: string;
  private id: string;

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

  public static async fetchAll() {
    return await db.select().from(prods);
  }

  public static async findById(id: string) {
    return await db.select().from(prods).where(eq(prods.id, id));
  }

  public static deleteProduct(product: Product) {}
}
