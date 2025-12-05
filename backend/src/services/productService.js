import { productRepository } from "../repositories/productRepository.js";

export const productService = {
  getAll: () => productRepository.findAll(),

  getById: async (id) => {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  },

  create: async (data) => {
    if (!data.name || !data.price || data.price <= 0) {
      throw new Error("Datos de producto inválidos.");
    }
    return productRepository.create(data);
  },

  update: async (id, data) => {
    const updated = await productRepository.update(id, data);
    if (!updated) {
      throw new Error("Producto no encontrado.");
    }
    return updated;
  },

  remove: async (id) => {
    const removed = await productRepository.remove(id);
    if (!removed) {
      throw new Error("Producto no encontrado.");
    }
    return true;
  }
};
