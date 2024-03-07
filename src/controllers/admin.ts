import Product from "../models/product";

export const getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Products",
    productsCSS: true,
    activeAdmin: true,
  });
};

export const postAddProduct = (
  req: {
    body: { title: string; price: string; image: string; description: string };
  },
  res,
  next,
) => {
  const product = new Product(
    req.body.title,
    req.body.price + " lei",
    req.body.image,
    req.body.description,
  );
  product.save();
  res.redirect("/");
};

export const getAdminProducts = (req, res, next) => {
  Product.fetchAll((products: object[]): void => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      hasProducts: products.length > 0,
      shopCSS: true,
      activeAdminProducts: true,
    });
  });
};
