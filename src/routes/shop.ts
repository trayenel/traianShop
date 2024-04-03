import { Router } from "express";
import {
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetail,
  getProducts,
  postCartDelete,
  postCart,
  postCheckout,
} from "../controllers/shop";

const router = Router();

router.get("/", getIndex);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

router.post("/checkout", postCheckout);

router.get("/products", getProducts);

router.get("/orders", getOrders);

router.get("/products/:productId", getProductDetail);

router.post("/cart", postCart);

router.post("/cart-delete-item/", postCartDelete);

export default router;
