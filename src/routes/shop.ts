import { Router } from "express";
import {
  getCart,
  getCheckout,
  getOrders,
  getProductDetail,
  getProducts,
  postCart,
} from "../controllers/shop";
import { getIndex } from "../controllers/shop";

const router = Router();

router.get("/", getIndex);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

router.get("/products", getProducts);

router.get("/orders", getOrders);

router.get("/products/:productId", getProductDetail);

router.post("/cart", postCart);
export default router;
