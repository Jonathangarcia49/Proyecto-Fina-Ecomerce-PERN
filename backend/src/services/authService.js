import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository.js";
import { Role } from "../models/Role.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const authService = {
  register: async ({ name, email, password, role }) => {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error("El correo ya está registrado.");
    }

    const roleName = role || "cliente";
    const roleRecord = await Role.findOne({ where: { name: roleName } });
    if (!roleRecord) {
      throw new Error("Rol inválido.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      roleId: roleRecord.id
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleRecord.name,
      roleId: roleRecord.id
    };
  },

  login: async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Credenciales inválidas.");
    }

    const token = jwt.sign(
      { userId: user.id, roleId: user.Role.id, role: user.Role.name },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role.name,
        roleId: user.Role.id
      }
    };
  }
};
