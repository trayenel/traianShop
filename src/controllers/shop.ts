import Product from "../models/product";
import Cart from "../models/cart";

export const getIndex = (req, res) => {
  Product.fetchAll()
    .then((data) =>
      res.render("shop/index", {
        prods: data,
        hasProducts: data.length > 0,
        shopCSS: true,
        pageTitle: "Shop",
        activeShop: true,
      }),
    )
    .catch((err) => console.log(err));
};

export const getProducts = (req, res) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/product-list", {
        prods: data,
        hasProducts: data.length > 0,
        shopCSS: true,
        pageTitle: "Shop",
        activeProducts: true,
      });
    })
    .catch((err) => console.log(err));
};

export const getCart = (req, res) => {
  Cart.getAllProducs(req.user.id)
    .then((data) => {
      const table: Array<object> = [];
      data.forEach((prod) => {
        prod.products.price = prod.products.price * prod.cartEntries.qty;
        table.push(prod);
      });
      res.render("shop/cart", {
        pageTitle: "Your cart",
        activeCart: true,
        hasProduct: table.length > 0,
        product: table,
      });
    })
    .catch((err) => console.log(err));
};

export const postCart = (req, res) => {
  Cart.getProduct(req.body.productId, req.cart.id).then(
    (
      data: Array<{
        id: number;
        cartId: number;
        cartItemId: number;
        qty: number;
      }>,
    ) => {
      if (data.length === 0) {
        Cart.addProduct(req.body.productId, req.cart.id).then((data) =>
          res.redirect("/cart"),
        );
      } else {
        Cart.updateProduct(
          req.body.productId,
          req.cart.id,
          data[0].qty + 1,
        ).then((data) => {
          if (!data.rowCount) throw Error();
          res.redirect("/cart");
        });
      }
    },
  );
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
  Product.findById(prodId).then((data) =>
    res.render("shop/product-detail", {
      product: data[0],
      shopCSS: true,
    }),
  );
};

export const postCartDelete = (req, res) => {
  Cart.deleteProduct(req.body.productCartId, req.cart.id);
  return res.redirect("/cart");
};
