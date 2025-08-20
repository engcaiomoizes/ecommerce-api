import express, { Request, Response } from "express";
import clientes from "./routes/clientes.route";
import produtos from "./routes/produtos.route";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello, World!");
});

app.use("/clientes", clientes);
app.use("/produtos", produtos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT);
});