import { productService } from "../services/productService.js";

export const productController = {
  getAll: async (req, res) => {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await productService.getById(req.params.id);
      return res.json(product);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const product = await productService.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const product = await productService.update(req.params.id, req.body);
      return res.json(product);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

  remove: async (req, res) => {
    try {
      await productService.remove(req.params.id);
      return res.json({ message: "Producto eliminado" });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
};
