import fs from "fs";
import path from "path";

let products: object[] = [];

const p = path.join(__dirname, "..", "..", "data", "products.json");

function getProductsFromFile(cb: Function) {
  let products: object[] = [];

  fs.readFile(p, (err, data) => {
    if (err) return cb([]);
    cb(JSON.parse(data.toString()));
  });
}

export default class Product {
  private title: string;

  constructor(t: string) {
    this.title = t;
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
