const express = require("express");
const { AdModel } = require("../Modal/Admodal");

const AdRouter = express.Router();

AdRouter.post("/create", async (req, res) => {
  let data = req.body;
  let ad = new AdModel({ ...data });
  try {
    ad.save();
  } catch (e) {
    res.send("Something Went Wrong");
  }
  res.send({ mag: "product ad has been added" });
});

AdRouter.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await AdModel.findByIdAndDelete(id);
    res.send({ mag: "product ad has been deleted" });
  } catch (e) {
    res.send("Something Went Wrong");
  }
});

AdRouter.get("/", async (req, res) => {
  const { page, limit, category, sort, order, q } = req.query;

  try {
    if (q) {
      const products = await AdModel.find({
        name: { $regex: "(?i)^" + q },
      });
      res.send(products);
    }
    if (category && page && limit) {
      let products = await AdModel.find({ category })
        .skip((page - 1) * limit)
        .limit(limit);
      return res.json(products);
    } else if ((page, limit, sort, order)) {
      let products = await AdModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (order == asc) {
        products.sort();
      } else {
        products.sort().reverse();
      }
      res.json(products);
    } else if (page && limit) {
      let products = await AdModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
      return res.json(products);
    }
  } catch (e) {
    res.send("Something Wrong");
  }
});

module.exports = { AdRouter };
