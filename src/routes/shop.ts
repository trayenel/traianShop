import { Router } from "express";
import { products } from "./admin";

const router = Router();

router.get("/", (req, res) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
  });
});

export default router;
