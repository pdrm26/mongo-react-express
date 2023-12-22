// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database";

// Global Config
const router = express.Router();
// GET

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await collections.users?.find({}).toArray();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.messsage);
  }
});

// POST

// PUT

// DELETE


export default router