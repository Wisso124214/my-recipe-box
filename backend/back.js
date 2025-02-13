import app from "./middleware.js";
import { dbConnection } from "./db.js";
import { createUserRoutes } from "./controllers/userController.js";
import { createRouteTestDB } from "./routes/userRoutes.js";

dbConnection(app);
createUserRoutes(app);
createRouteTestDB(app);