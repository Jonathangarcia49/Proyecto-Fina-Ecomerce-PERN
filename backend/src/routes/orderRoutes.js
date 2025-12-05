import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { hasPermission } from "../middlewares/permissionMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware.verifyToken,
  orderController.createOrder
);

router.get(
  "/my",
  authMiddleware.verifyToken,
  orderController.getMyOrders
);

router.get(
  "/",
  authMiddleware.verifyToken,
  hasPermission("ORDER_READ"),
  orderController.getAllOrders
);

export default router;
