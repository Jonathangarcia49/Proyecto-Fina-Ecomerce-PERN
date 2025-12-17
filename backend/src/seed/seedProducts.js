import * as ProductModel from "../models/Product.js";
import * as CategoryModel from "../models/Category.js";

const Product = ProductModel.default || ProductModel.Product;
const Category = CategoryModel.default || CategoryModel.Category;

export const seedProducts = async () => {
  console.log("➡️ Ejecutando seed de productos...");

  if (!Product || !Category) {
    console.error("❌ Modelos no encontrados");
    return;
  }

  const count = await Product.count();
  if (count > 0) {
    console.log("ℹ️ Productos ya existen");
    return;
  }

  const category = await Category.findOne();
  if (!category) {
    console.log("⚠️ No hay categorías");
    return;
  }

  await Product.bulkCreate([
    {
      name: "Filtro de Aceite Volvo",
      description: "Filtro para camión pesado",
      price: 45,
      stock: 20,
      image: "/uploads/filtro.png",
      categoryId: category.id
    },
    {
      name: "Pastillas de Freno Scania",
      description: "Pastillas de freno reforzadas",
      price: 120,
      stock: 15,
      image: "/uploads/freno.png",
      categoryId: category.id
    },
    {
      name: "Batería 12V",
      description: "Batería industrial",
      price: 180,
      stock: 10,
      image: "/uploads/bateria.png",
      categoryId: category.id
    },
    {
      name: "Amortiguador",
      description: "Amortiguador trasero",
      price: 95,
      stock: 8,
      image: "/uploads/amortiguador.png",
      categoryId: category.id
    },
    {
      name: "Filtro de Aire",
      description: "Filtro de aire pesado",
      price: 60,
      stock: 25,
      image: "/uploads/aire.png",
      categoryId: category.id
    }
  ]);

  console.log("✅ Productos creados correctamente");
};
