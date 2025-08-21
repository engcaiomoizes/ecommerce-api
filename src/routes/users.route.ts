import { Router } from "express";
import * as controller from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", controller.all);
router.post("/", controller.create);
router.put("/", controller.update);
router.delete("/", controller.del);
router.get("/:id", controller.get);

// Addresses
router.get("/:id/addresses", controller.getAddresses);
router.post("/:id/addresses", controller.createAddress);
router.delete("/:id/addresses", controller.delAddress);

export default router;