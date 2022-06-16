const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { json } = require("express/lib/response");

const getCategories = (req, res, next) => {
  Category.find({}, function (err, data) {
    if (err) {
      next;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};
const createCats = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody.name);
  let newCats = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    color: req.body.color,
  });
  newCats
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Success",
        data: data,
      });
    })
    .catch(next);
};
const updateCats = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  let updateCats = new Category({
    name: req.body.name,
    color: req.body.color,
  });
  Category.findOneAndUpdate(
    { name: req.body.name },
    updateCats,
    (err, data) => {
      if (err) next;
      res.send("update yes");
    }
  );
};

const deleteCats = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  let catsName = {
    name: "Зууш",
  };
  Category.findOneAndDelete({ name: req.body.name }, catsName, (err, data) => {
    if (err) next;
    res.send("delete");
  });
};

// router.get("/cats/search", (req, res) => {
//   Foods.find({ name: { $regex: `${req.query.name}` } }, function (err, data) {
//     if (err) {
//       throw err;
//     } else {
//       return res.json({ data: data });
//     }
//   });
// });

module.exports = { getCategories, createCats, updateCats, deleteCats };
