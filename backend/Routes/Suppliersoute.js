import express from "express";
import Supplier from "../Models/supplySchema.js";
const router = express.Router();

/* @desc list of supplier */
/* @request  get*/
/* @route /api/suppliers/cityname*/

router.get("/suppliers/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const supplyData = await Supplier.find({ city: city })
      .select("-verify -Report")
      .sort({ createdAt: "desc" })
      .exec();

    if (supplyData.length !== 0) {
      res.json({ supplyData });
    } else {
      res.send({
        message: "No Records",
      });
    }
  } catch (err) {
    res.status(404);
    res.send({
      error: "Data not exists",
    });
  }
});

/* @desc add a supplier */
/* @request  Post*/
/* @route /api/addsupplier*/

router.post("/addsupplier", async (req, res) => {
  const { org, authorName, helplines, location, city } = req.body;

  try {
    const supplyData = await Supplier.create({
      org,
      authorName,
      helplines,
      location,
      city,
    });
    if (supplyData) {
      res.send({
        message: "Supplier Added Successfully",
      });
    }
  } catch (err) {
    res.status(400);
    console.log(err);
    res.send({
      error: "Error Occured",
    });
  }
});

/* @desc verify a supplier */
/* @request PUT*/
/* @route private  /api/verify */

router.put("/verifyscore", async (req, res) => {
  const { supplyId } = req.body;
  try {
    const existData = await Supplier.findById(supplyId);

    if (existData) {
      existData.verifyscore = existData.verifyscore + 1;
      await existData.save();
      res.send({
        message: "Thank you for verifying ",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({
      error: err,
    });
  }
});

/* @desc verify a supplier */
/* @request PUT*/
/* @route private  /api/verify */

router.put("/verify", async (req, res) => {
  const { supplyId } = req.body;
  try {
    const existData = await Supplier.findById(supplyId);

    if (existData) {
      existData.verify = !existData.verify;
      await existData.save();
      res.send({
        message: "Thank you for verifying ",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({
      error: err.msg,
    });
  }
});

/* @desc verify a supplier */
/* @request PUT*/
/* @route private  /api/verify */

router.put("/report", async (req, res) => {
  const { supplyId } = req.body;
  try {
    const existData = await Supplier.findById(supplyId);

    if (existData) {
      existData.report = !existData.report;
      await existData.save();
      res.send({
        message: "Thank you for verifying ",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({
      error: err.msg,
    });
  }
});

export default router;
