// External Dependencies
import express from "express";
import {
  deleteUser,
  findAllUsers,
  findUserById,
  insertUser,
  updateUser,
} from "../controllers/userController";

// Global Config
const router = express.Router();

//Custom middleware for just this route
router.use((req, res, next) => {
  console.log("Request to the users route");

  next();
});

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.post("/", insertUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
