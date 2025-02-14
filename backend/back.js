import app from "./middleware.js";
import { dbConnection } from "./db.js";
import { createUserControllers } from "./controllers/userController.js";
import { createUserRoutes } from "./routes/userRoutes.js";

dbConnection(app);

createUserControllers(app);
createUserRoutes(app);