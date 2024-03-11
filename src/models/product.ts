import fs from "fs";
import path from "path";
import Cart from "./cart";

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

  public save() {
    getProductsFromFile((products: object[]) => {
      if (this.id) {
        const productIndex = products.findIndex((prod) => prod.id === this.id);
        const updatedArray = [...products];
        updatedArray[productIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedArray), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });

    fs.readFile(p, (err, data) => {});
  }

  public static fetchAll(cb: Function) {
    getProductsFromFile(cb);
  }

  public static findById(id: string, cb: Function) {
    getProductsFromFile((products: Array<object>) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  public static deleteProduct(product: Product) {
    getProductsFromFile((products: Array<object>) => {
      const newProd = products.filter((prod) => prod.id !== product.id);
      fs.writeFile(p, JSON.stringify(newProd), (err) => {
        console.log(err);
        if (!err) Cart.deleteProduct(product.id, +product.price);
      });
    });
  }
}
