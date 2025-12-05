import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { hasPermission } from "../middlewares/permissionMiddleware.js";

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post(
  "/",
  authMiddleware.verifyToken,
  hasPermission("PRODUCT_CREATE"),
  productController.create
);

router.put(
  "/:id",
  authMiddleware.verifyToken,
  hasPermission("PRODUCT_UPDATE"),
  productController.update
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,
  hasPermission("PRODUCT_DELETE"),
  productController.remove
);

export default router;
