import express from "express";
import connectDB from "./config/db.js";
import "./loadEnvironment.js";
import users from "./routes/users.js";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

// Load the routes
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
