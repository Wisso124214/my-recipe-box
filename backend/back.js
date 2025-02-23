import app from "./middleware.js";
import { dbConnection } from "./db.js";
import { createUserControllers } from "./controllers/userController.js";
import { createUserRoutes } from "./routes/userRoutes.js";
import { createRecipeControllers } from "./controllers/recipeController.js";
import { createRecipeRoutes } from "./routes/recipeRoutes.js";

dbConnection(app);

createUserControllers(app);
createUserRoutes(app);

createRecipeControllers(app);
createRecipeRoutes(app);

