import express from "express";
import db from "../config/db_conn.js";

const router = express.Router();
let collection = await db.collection("users");

router.get("/", async (req, res) => {
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/", async (req, res) => {
  const results = collection.insertOne(req.body);
  res.send(results).status(200);
});


// TODO: write the put and patch for it
router.patch("/", async (req, res) => {
  const results = collection.insertOne(req.body);
  res.send(results).status(200);
});

export default router;
