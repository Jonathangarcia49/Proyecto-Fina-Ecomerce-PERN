import { Category } from "../models/Category.js";

export const categoryRepository = {
  findAll: () => Category.findAll(),
  findById: (id) => Category.findByPk(id),
  create: (data) => Category.create(data)
};
