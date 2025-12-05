import { Role } from "../models/Role.js";
import { Permission } from "../models/Permission.js";

export const hasPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user?.roleId;
      if (!roleId) return res.status(403).json({ error: "Sin rol asignado" });

      const role = await Role.findByPk(roleId, {
        include: Permission
      });

      const allowed = role?.Permissions?.some(
        (p) => p.action === requiredPermission
      );

      if (!allowed) {
        return res.status(403).json({ error: "Permiso denegado" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Error validando permisos" });
    }
  };
};
