import Product from "../models/product";

export const getIndex = (req, res) => {
  Product.fetchAll((products: Array<object>): void => {
    res.render("shop/index", {
      prods: products,
      hasProducts: products.length > 0,
      shopCSS: true,
      pageTitle: "Shop",
      activeShop: true,
    });
  });
};

export const getProducts = (req, res) => {
  Product.fetchAll((products: Array<object>): void => {
    res.render("shop/product-list", {
      prods: products,
      hasProducts: products.length > 0,
      shopCSS: true,
      pageTitle: "Shop",
      activeProducts: true,
    });
  });
};

export const getCart = (req, res) => {
  res.render("shop/cart", {
    pageTitle: "Your cart",
    activeCart: true,
  });
};

export const getCheckout = (req, res) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    activeCheckout: true,
  });
};

export const getOrders = (req, res) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    activeOrders: true,
  });
};

export const getProductDetail = (
  req: { params: { productId: string } },
  res,
) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: { id: string; title: string }) =>
    res.render("shop/product-detail", {
      product: product,
      shopCSS: true,
    }),
  );
};
