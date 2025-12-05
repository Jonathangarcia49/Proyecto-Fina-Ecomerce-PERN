import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Conexión a PostgreSQL exitosa.");
    await sequelize.sync({ alter: true });
    console.log(" Mdelos sincronizados con la BD.");
  } catch (error) {
    console.error("Error al conectar a la BD:", error.message);
    process.exit(1);
  }
};
