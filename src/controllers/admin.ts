import Product from "../models/product";

export const getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    productsCSS: true,
    activeAdmin: true,
  });
};

export const postAddProduct = (
  req: {
    body: {
      title: string;
      price: string;
      image: string;
      description: string;
      id: number;
    };
  },
  res,
) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.price + " lei",
    req.body.image,
    req.body.description,
  );
  product.save();
  res.redirect("/");
};

export const getAdminProducts = (req, res) => {
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

export const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId: string = req.params.productId;
  Product.findById(
    prodId,
    (product: {
      title: string;
      price: string;
      image: string;
      description: string;
      id: number;
    }) => {
      console.log();
      if (!product) return res.redirect("/");
      product.price = product.price.split(" ")[0];
      res.render("admin/edit-product", {
        pageTitle: "Edit Products",
        productsCSS: true,
        activeAdmin: true,
        editing: editMode,
        product: product,
      });
    },
  );
};

export const postEditProduct = (req, res) => {
  const prodId: string = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price.split(" ")[0];
  const updatedDesc = req.body.description;
  const updatedImgUrl = req.body.image;
  const updatedProd = new Product(
    prodId,
    updatedTitle,
    updatedPrice + " lei",
    updatedImgUrl,
    updatedDesc,
  );
  updatedProd.save();
  return res.redirect("/admin/products");
};

export const postDeleteProduct = (req, res) => {
  const prodId: string = req.body.productId;
  Product.findById(
    prodId,
    (product: {
      title: string;
      price: string;
      image: string;
      description: string;
      id: number;
    }) => {
      Product.deleteProduct(product);
    },
  );
  return res.redirect("/admin/products");
};
