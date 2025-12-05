import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./Role.js";

export const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(120), unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "users",
  timestamps: true
});

User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
