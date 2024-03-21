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
      price: number;
      image: string;
      description: string;
      id: number;
    };
  },
  res,
) => {
  const prod = new Product(
    req.body.title,
    req.body.price,
    req.body.image,
    req.body.description,
  );
  prod
    .save()
    .then((data) => res.redirect("/"))
    .catch((err: Error) => console.log(err));
};

export const getAdminProducts = (req, res) => {
  Product.fetchAll().then((data) =>
    res.render("admin/products", {
      prods: data,
      pageTitle: "Admin Products",
      hasProducts: data !== undefined,
      shopCSS: true,
      activeAdminProducts: true,
    }),
  );
};

export const getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect("/");
  const prodId: string = req.params.productId;
  Product.findById(prodId).then((product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Products",
      productsCSS: true,
      activeAdmin: true,
      editing: editMode,
      product: product[0],
    });
  });
};

export const postEditProduct = (req, res) => {
  const prodId: string = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price.split(" ")[0];
  const updatedDesc = req.body.description;
  const updatedImgUrl = req.body.image;
  Product.editProduct(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImgUrl,
    prodId,
  );
  return res.redirect("/admin/products");
};

export const postDeleteProduct = (req, res) => {
  const prodId: string = req.body.productId;
  Product.deleteProduct(prodId);
  return res.redirect("/admin/products");
};
