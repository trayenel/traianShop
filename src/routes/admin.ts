import { Router } from "express";
import {getAddProduct, getAdminProducts} from "../controllers/admin";
import { postAddProduct } from "../controllers/admin";

const router = Router();

router.get("/products", getAdminProducts);

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

export default router;
