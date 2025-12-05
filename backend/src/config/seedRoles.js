import { Role } from "../models/Role.js";
import { Permission } from "../models/Permission.js";
import { RolePermission } from "../models/RolePermission.js";

export const seedRolesAndPermissions = async () => {
  const roles = ["admin", "cliente", "vendedor"];
  const permissions = [
    "PRODUCT_CREATE",
    "PRODUCT_UPDATE",
    "PRODUCT_DELETE",
    "USER_READ",
    "CATEGORY_CREATE",
    "CATEGORY_UPDATE",
    "CATEGORY_DELETE",
    "ORDER_READ",
    "ADMIN_STATS"
  ];

  for (const name of roles) {
    await Role.findOrCreate({ where: { name } });
  }

  for (const action of permissions) {
    await Permission.findOrCreate({ where: { action } });
  }

  const adminRole = await Role.findOne({ where: { name: "admin" } });
  const vendedorRole = await Role.findOne({ where: { name: "vendedor" } });
  const clienteRole = await Role.findOne({ where: { name: "cliente" } });

  const allPermissions = await Permission.findAll();

  await adminRole.setPermissions(allPermissions);

  await vendedorRole.setPermissions(
    allPermissions.filter(p =>
      ["PRODUCT_CREATE", "PRODUCT_UPDATE", "ORDER_READ"].includes(p.action)
    )
  );

  await clienteRole.setPermissions([]);

  console.log(" Roles y permisos iniciales registrados.");
};
