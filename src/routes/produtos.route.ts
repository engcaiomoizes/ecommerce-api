import { Router } from "express";
import * as controller from "../controllers/produto.controller";

const router = Router();

router.get("/", controller.all);
router.post("/", controller.create);
router.put("/", controller.update);
router.get("/:id", controller.get);

export default router;