import express from "express";

const router = express.Router();

router.get("/cookies", (req, res) => {
  res
    .cookie("pedicookie", 192042049270291, {
      maxAge: 10000,
      httpOnly: true,
    })
    .send({
      status: "cookie is set",
      cookie: req.cookies,
    });
});

export default router;
