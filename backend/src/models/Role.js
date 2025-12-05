import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  }
}, {
  tableName: "roles",
  timestamps: false
});
