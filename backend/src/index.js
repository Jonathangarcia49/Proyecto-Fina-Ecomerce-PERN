import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import { seedRolesAndPermissions } from "./config/seedRoles.js";
import routes from "./routes/index.js";
import { errorHandler } from "./utils/errorHandler.js";

// Importar modelos para registrar asociaciones
import "./models/Role.js";
import "./models/Permission.js";
import "./models/RolePermission.js";
import "./models/User.js";
import "./models/Category.js";
import "./models/Product.js";
import "./models/Order.js";
import "./models/OrderItem.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "API E-commerce Repuestos Pesados (PERN) funcionando "
  });
});

app.use("/api", routes);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  await seedRolesAndPermissions();
  app.listen(PORT, () => {
    console.log(` Backend escuchando en http://localhost:${PORT}`);
  });
};

start();
