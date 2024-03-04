import { Router } from "express";
import path from "path";
import { product } from "./admin";

const router = Router();

router.get("/", (req, res, next) => {
  console.log(product);
  res.sendFile(path.join(__dirname, "..", "..", "views", "shop.html"));
});

export default router;
