import Product from "../models/product";
import Cart from "../models/cart";
import Order from "../models/order";

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
  let totalPrice = 0;
  Cart.getAllProducs(req.user.id)
    .then((data) => {
      const productArr: Array<object> = [];
      data.forEach((prod) => {
        prod.products.price = prod.products.price * prod.cartEntries.qty;
        totalPrice += prod.products.price;
        productArr.push(prod);
      });
      res.render("shop/cart", {
        pageTitle: "Your cart",
        activeCart: true,
        hasProduct: productArr.length > 0,
        product: productArr,
        total: totalPrice,
      });
    })
    .catch((err) => console.log(err));
};

export const postCart = (req, res) => {
  Cart.addProduct(req.body.productId, req.cart.id).then((data) =>
    res.redirect("/cart"),
  );
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
  Cart.deleteProduct(req.body.productCartId, req.cart.id).then(() => res.redirect("/cart"))
};

export const postCheckout = (req, res) => {
  const ordersArr: Array<object> = [];
  Cart.getAllProducs(req.user.id).then(data => { let orderId: number; Order.createOrder(req.user.id).then(data => orderId = data[0].id).then(() => data.forEach(prod => Order.addOrderItems(orderId, prod.products.id, prod.cartEntries.qty))) })
  // Cart.emptyCart(req.cart.id)
  res.redirect('/checkout')
};

export const getCheckout = (req, res) => {
  const ordersArr: Array<object> = []
  Order.getOrders(req.user.id).then(data => data.forEach(prod => ordersArr.push({ orderId: prod.orders.id, prodTitle: prod.products?.title, prodPrice: prod.products?.price * prod.orderEntries?.qty, prodQty: prod.orderEntries?.qty }))).then(() =>
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      activeCheckout: true,
      orders: ordersArr
    }))
};
