import express, { Express } from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database";
import usersRouter from "./routes/users";
import miscRouter from "./routes/misc";
import path from "path";
import timestampLogger from "./middlewares/timestampLogger";
import personalizeSignature from "./middlewares/personalizeSignature";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import session from "express-session";

const app: Express = express();
connectToDatabase()
  .then(() => {
    //Mount the middlewares
    app.use(timestampLogger);
    app.use(personalizeSignature);
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json()); // For parsing JSON data
    app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded form data
    app.use("/static", express.static(path.join(__dirname, "public"))); // Serving static assets from the 'public' folder
    app.use(
      session({ // with default save the memory which is not safe, save them to redis
        secret: "thisismysecrctekey",
        saveUninitialized: true,
        cookie: { maxAge: 1000 }, // just 1s (;
        resave: false,
        name: "cookie-name"
      }),
    );

    // Mount the routes
    app.use("/users", usersRouter);
    app.use("/misc", miscRouter);

    // Mount error handler middleware
    app.use(errorHandler);

    app.listen(5050, () => {
      console.log(`Server running at http://localhost:5050`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
