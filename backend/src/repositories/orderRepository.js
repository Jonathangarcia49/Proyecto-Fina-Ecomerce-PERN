import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Product } from "../models/Product.js";

export const orderRepository = {
  createOrder: async ({ userId, items, totalAmount }) => {
    return Order.sequelize.transaction(async (t) => {
      const order = await Order.create(
        { userId, totalAmount, status: "pendiente" },
        { transaction: t }
      );

      for (const item of items) {
        await OrderItem.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          },
          { transaction: t }
        );
      }
      return order;
    });
  },

  findByUser: (userId) =>
    Order.findAll({
      where: { userId },
      include: [
        { model: OrderItem, as: "items", include: [Product] }
      ],
      order: [["createdAt", "DESC"]]
    }),

  findAll: () =>
    Order.findAll({
      include: [
        { model: OrderItem, as: "items", include: [Product] }
      ],
      order: [["createdAt", "DESC"]]
    }),

  getStats: async () => {
    const totalOrders = await Order.count();
    const totalSalesResult = await Order.findAll({
      attributes: [
        [Order.sequelize.fn("SUM", Order.sequelize.col("totalAmount")), "totalSales"]
      ],
      raw: true
    });

    const totalSales = totalSalesResult[0].totalSales || 0;
    return { totalOrders, totalSales };
  }
};
