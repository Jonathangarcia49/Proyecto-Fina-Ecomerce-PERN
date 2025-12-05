import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Role } from "./Role.js";
import { Permission } from "./Permission.js";

export const RolePermission = sequelize.define("RolePermission", {
  roleId: {
    type: DataTypes.INTEGER,
    references: { model: Role, key: "id" }
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: { model: Permission, key: "id" }
  }
}, {
  tableName: "role_permissions",
  timestamps: false
});

Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });
