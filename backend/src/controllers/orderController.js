import { orderService } from "../services/orderService.js";

export const orderController = {
  createOrder: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { items } = req.body;
      const order = await orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const userId = req.user.userId;
      const orders = await orderService.getOrdersByUser(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAdminStats: async (req, res) => {
    try {
      const stats = await orderService.getAdminStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
