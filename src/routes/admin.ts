import { Router } from "express";
import {
  getAddProduct,
  getAdminProducts,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin";

const router = Router();

router.get("/products", getAdminProducts);

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product/", postEditProduct);

router.post("/delete-product/", postDeleteProduct);

export default router;
