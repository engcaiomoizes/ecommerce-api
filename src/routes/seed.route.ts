import { Router } from "express";
import * as controller from "../controllers/seed.controller";

const router = Router();

router.post("/products", controller.products);

export default router;