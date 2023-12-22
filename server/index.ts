import express, { Express } from "express";
import cors from "cors";
import { Error } from "mongoose";
import { connectToDatabase } from "./services/database";
import usersRouter from "./routes/users";


const app: Express = express();
connectToDatabase()
  .then(() => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // connectDB();

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
