import { orderRepository } from "../repositories/orderRepository.js";
import { productRepository } from "../repositories/productRepository.js";
import { Product } from "../models/Product.js";

export const orderService = {
  createOrder: async (userId, cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("El carrito está vacío.");
    }

    const ids = cartItems.map(i => i.productId);
    const products = await Product.findAll({ where: { id: ids } });

    let totalAmount = 0;
    const items = cartItems.map(ci => {
      const prod = products.find(p => p.id === ci.productId);
      if (!prod) throw new Error("Producto no encontrado en el pedido.");
      const price = Number(prod.price);
      totalAmount += price * ci.quantity;

      return {
        productId: ci.productId,
        quantity: ci.quantity,
        price
      };
    });

    const order = await orderRepository.createOrder({
      userId,
      items,
      totalAmount
    });

    return order;
  },

  getOrdersByUser: (userId) => orderRepository.findByUser(userId),

  getAllOrders: () => orderRepository.findAll(),

  getAdminStats: async () => {
    const { totalOrders, totalSales } = await orderRepository.getStats();
    const totalProducts = await productRepository.findAll().then(r => r.length);
    return { totalOrders, totalSales, totalProducts };
  }
};
