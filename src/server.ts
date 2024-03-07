import express from "express";
import bodyParser from "body-parser";
import shopRoutes from "./routes/shop";
import adminRoutes from "./routes/admin";
import path from "path";
import { get404 } from "./controllers/errors";
import { engine } from "express-handlebars";

const app = express();
app.engine("hbs", engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.use(get404);


app.listen(3000);
