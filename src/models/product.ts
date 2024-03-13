import db from "../util/database";
import Cart from "./cart";

let products: object[] = [];

export default class Product {
  private title: string;
  private price: string;
  private image: string;
  private description: string;
  private id: string;

  constructor(
    id: any,
    title: string,
    price: string,
    image: string,
    description: string,
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.id = id;
  }

  public save() {}
  public static fetchAll() {
    return db.execute("SELECT * from products");
  }

  public static findById(id: string, cb: Function) {}

  public static deleteProduct(product: Product) {}
}
