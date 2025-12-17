import * as CategoryModel from "../models/Category.js";

const Category = CategoryModel.default || CategoryModel.Category;

export const seedCategories = async () => {
  if (!Category) {
    console.error("❌ Category model no encontrado");
    return;
  }

  const count = await Category.count();
  if (count > 0) {
    console.log("Categorías ya existen");
    return;
  }

  await Category.create({ name: "Repuestos Generales" });

  console.log("Categoría creada");
};
