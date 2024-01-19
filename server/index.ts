import express, { Express } from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database";
import usersRouter from "./routes/users";
import path from "path";
import timestampLoggerMiddleware from "./middlewares/timestamp";
import personalizeSignatureMidleware from "./middlewares/personalizeSignatureMidleware";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

const app: Express = express();
connectToDatabase()
  .then(() => {
    //Mount the middlewares
    app.use(timestampLoggerMiddleware);
    app.use(personalizeSignatureMidleware);
    app.use(errorHandlerMiddleware);
    
    app.use(cors());
    app.use(express.json()); // For parsing JSON data
    app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
    app.use("/static", express.static(path.join(__dirname, "public"))); // Serving static assets from the 'public' folder
    
    // Load the routes
    app.use("/users", usersRouter);
    app.listen(5050, () => {
      console.log(`Server running at http://localhost:5050`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
