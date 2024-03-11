import fs from "fs";
import path from "path";

const p = path.join(__dirname, "..", "..", "data", "cart.json");

export default class Cart {
  public static addProduct(id: string, productPrice: number) {
    fs.readFile(p, (err, data) => {
      let cart: { products: Array<object>; totalPrice: number } = {
        products: [],
        totalPrice: 0,
      };
      if (!err) {
        cart = JSON.parse(data.toString());
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id,
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }
}
