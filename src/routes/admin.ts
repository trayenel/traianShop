import { Router } from "express";

const router = Router();

export const products: Array<object> = [];

router.get("/add-product", (req, res) => {
  res.render("add-product", { pageTitle: "Add Products", productsCSS: true });
});

router.post("/add-product", (req: { body: { title: string } }, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

export default router;
