import { Router } from "express";
import path from "path";

const router = Router();

export const product: Array<object> = [];

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  product.push({ title: req.body.title });
  res.redirect("/");
});

export default router;
