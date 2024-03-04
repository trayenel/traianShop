import { Router } from "express";

const router = Router();

export const products: Array<object> = [];

router.get("/add-product", (req, res) => {
  res.render("add-product", {pageTitle: 'Add Product∏'});
});

router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

export default router;
