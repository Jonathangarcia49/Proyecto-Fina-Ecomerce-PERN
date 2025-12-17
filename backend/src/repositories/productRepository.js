import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export const productRepository = {

  findAll: async () => {
    return await Product.findAll({
      include: [Category]
    });
  },

  findById: async (id) => {
    return await Product.findByPk(id, {
      include: [Category]
    });
  },

  create: async (data) => Product.create(data),

  update: async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  },

  remove: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
};
