import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { hasPermission } from "../middlewares/permissionMiddleware.js";
import { orderController } from "../controllers/orderController.js";

const router = Router();

router.get(
  "/stats",
  authMiddleware.verifyToken,
  hasPermission("ADMIN_STATS"),
  orderController.getAdminStats
);

export default router;
