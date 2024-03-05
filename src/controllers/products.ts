import Product from "../models/product";

export const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Products",
    productsCSS: true,
    activeAdmin: true,
  });
};

export const postAddProduct = (req: { body: { title: string } }, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products: Array<object>): void => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      shopCSS: true,
      activeShop: true,
    });
  });
};
