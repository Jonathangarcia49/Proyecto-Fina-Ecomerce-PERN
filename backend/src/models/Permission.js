import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  action: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  }
}, {
  tableName: "permissions",
  timestamps: false
});
