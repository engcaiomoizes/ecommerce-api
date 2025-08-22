import express, { Request, Response } from "express";
import cors from "cors";
import users from "./routes/users.route";
import products from "./routes/products.route";
import categories from "./routes/categories.route";
import auth from "./routes/auth.route";
import seed from "./routes/seed.route";
import offers from "./routes/offers.route";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:4200",
}));

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, World!");
});

app.use("/users", users);
app.use("/products", products);
app.use("/categories", categories);
app.use("/offers", offers);
app.use("/auth", auth);
app.use("/seed", seed);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT);
});