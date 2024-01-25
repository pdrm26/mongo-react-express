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

//Custom middleware just when "id" present in the "url"
router.param("id", (req, res, next, userIdValue) => {
  console.log(
    `This log is just for urls that have the id parameter..., user id: ${userIdValue}`,
  );
  next();
});

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.post("/", insertUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
