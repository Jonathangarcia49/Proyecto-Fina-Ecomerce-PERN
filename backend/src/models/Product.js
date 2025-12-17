import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Category } from "./Category.js";

export const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "products",
  timestamps: true
});

// relaciones
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
