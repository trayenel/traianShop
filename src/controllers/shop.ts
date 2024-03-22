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
  Cart.getProducts((cart) => {
    Product.fetchAll((products: Array<object>) => {
      const cartProds = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );
        if (cartProductData)
          cartProds.push({ productData: product, qty: cartProductData.qty });
      }
      console.log(cartProds);
      res.render("shop/cart", {
        pageTitle: "Your cart",
        activeCart: true,
        hasProduct: cartProds.length > 0,
        products: cartProds,
      });
    });
  });
};

export const postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(
    prodId,
    (product: {
      title: string;
      price: string;
      image: string;
      description: string;
    }) => {
      Cart.addProduct(prodId, +product.price.split(" ")[0]);
    },
  );
  res.redirect("/cart");
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
  const prodId = req.body.productId;
  Product.findById(prodId, (prod) => Cart.deleteProduct(prod.id, prod.price));
  return res.redirect("/cart");
};
