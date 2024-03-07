import { Router } from "express";
import {getCart, getCheckout, getProducts} from "../controllers/shop";
import { getIndex } from "../controllers/shop";

const router = Router();

router.get("/", getIndex);

router.get("/cart", getCart);

router.get("/checkout", getCheckout);

export default router;
