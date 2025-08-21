import { Router } from "express";
import * as controller from "../controllers/product.controller";

const router = Router();

router.get("/:category", controller.allByCategory);

router.get("/", controller.all);
router.post("/", controller.create);
router.put("/", controller.update);
router.get("/:id", controller.get);
router.delete("/", controller.del);

router.delete("/drop", controller.delAll);

export default router;