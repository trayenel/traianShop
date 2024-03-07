import fs from "fs";
import path from "path";

let products: object[] = [];

const p = path.join(__dirname, "..", "..", "data", "products.json");

function getProductsFromFile(cb: Function) {
  fs.readFile(p, (err, data) => {
    if (err) return cb([]);
    cb(JSON.parse(data.toString()));
  });
}

export default class Product {
  private title: string;
  private price: string;
  private image: string;
  private description: string;

  constructor(
    title: string,
    price: string,
    image: string,
    description: string,
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  public save() {
    getProductsFromFile((products: object[]) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });

    fs.readFile(p, (err, data) => {});
  }

  public static fetchAll(cb: Function) {
    getProductsFromFile(cb);
  }
}
