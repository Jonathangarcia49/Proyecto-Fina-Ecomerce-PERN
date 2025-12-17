import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedUsers = async () => {
  const count = await User.count();
  if (count > 0) return;

  await User.bulkCreate([
    {
      name: "Admin",
      email: "admin@admin.com",
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    },
    {
      name: "Cliente",
      email: "cliente@test.com",
      password: await bcrypt.hash("123456", 10),
      role: "client",
    },
  ]);

  console.log("Usuarios seed creados");
};
