import { User } from "../models/User.js";
import { Role } from "../models/Role.js";

export const userRepository = {
  findByEmail: async (email) => {
    return User.findOne({ where: { email }, include: Role });
  },

  createUser: async (userData) => {
    return User.create(userData);
  }
};
