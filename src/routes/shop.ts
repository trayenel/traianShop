import { Router } from "express";
import { products } from "./admin";

const router = Router();

router.get("/", (req, res) => {
  console.log(products);
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    shopCSS: true,
    activeShop: true,
  });
});

export default router;
