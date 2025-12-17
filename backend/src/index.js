import app from "./app.js";
import { sequelize } from "./config/db.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada");

    await sequelize.sync(); // 👈 IMPORTANTE
    console.log("Modelos sincronizados");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
