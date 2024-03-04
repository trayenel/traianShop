import express from "express";
import bodyParser from "body-parser";
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import path from "path";
import { engine } from "express-handlebars";

const app = express();
app.engine("hbs", engine());
app.set("view engine", "hbs");

app.use("/admin", adminRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page not found" });
});

app.listen(3000);
