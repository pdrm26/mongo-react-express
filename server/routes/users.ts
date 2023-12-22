// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database";
import User from "../models/user";

// Global Config
const router = express.Router();

// GET
router.get("/", async (req: Request, res: Response) => {
  try {
    // const users = (await collections.users.find({}).toArray()) as User[];
    const users = await collections.users?.find({}).toArray();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.messsage);
  }
});

// GET BY USER ID
router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const query = { _id: new ObjectId(userId) };
    const user = await collections.users?.findOne(query);

    if (user) {
      res.status(200).send(user);
    }
  } catch (error: any) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});

// POST
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;
    const result = await collections.users?.insertOne(newUser);

    result
      ? res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new user.");
  } catch (error: any) {
    res.status(500).send(error.messsage);
  }
});

// PUT
router.put("/:id", async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  try {
    const updatedUser: User = req.body as User;
    const query = { _id: new ObjectId(userId) };

    const result = await collections.users?.updateOne(query, {
      $set: updatedUser,
    });

    result
      ? res.status(200).send(`Successfully updated user with id ${userId}`)
      : res.status(304).send(`User with id: ${userId} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  const userId = req?.params?.id;

  try {
    const query = { _id: new ObjectId(userId) };
    const result = await collections.users?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed user with id ${userId}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove user with id ${userId}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`User with id ${userId} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

export default router;
