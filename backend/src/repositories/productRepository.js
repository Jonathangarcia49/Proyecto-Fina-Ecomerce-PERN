import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export const productRepository = {
  findAll: () =>
    Product.findAll({
      include: [{ model: Category, as: "category" }]
    }),

  findById: (id) =>
    Product.findByPk(id, {
      include: [{ model: Category, as: "category" }]
    }),

  create: (data) => Product.create(data),

  update: async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return product.update(data);
  },

  remove: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
};
