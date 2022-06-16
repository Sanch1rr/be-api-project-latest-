const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const Foods = require("../models/foods");
const Category = require("../models/category");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { json } = require("express/lib/response");
const CategoryController = require("../controller/CategoryController");
const FoodController = require("../controller/FoodController");
const UserController = require("../controller/UserController");
const AuthController = require("../controller/AuthController");
const auth = require("../middleware/authentication");

// cats

router.get("/categories", CategoryController.getCategories);
router.post("/categories", CategoryController.createCats);
router.put("/categories", CategoryController.updateCats);
router.delete("/categories", CategoryController.deleteCats);

// foods
router.get("/foods", FoodController.getFoods);
router.post("/foods", FoodController.createFoods);
router.delete("/foods", FoodController.deleteFood);
router.put("/foods", FoodController.updateFood);
router.get("/foods/food/:id", FoodController.getFoodSearchId);
router.get("/foods/search", FoodController.getFoodSearchName);

// users
router.get("/users", auth, UserController.getUsers);
router.put("/users", auth, UserController.updateUsers);
router.post("/users", auth, UserController.createUsers);
router.delete("users", auth, UserController.deleteUsers);

// auth

router.post("/users/register", AuthController.register);
router.post("/users/login", AuthController.login);

router.get("/foods/food/:id", (req, res) => {
  Foods.findById({ _id: `${req.params.id}` }, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});

router.get("/foods/search", (req, res) => {
  Foods.find({ name: { $regex: `${req.query.name}` } }, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});
router.get("/cats/search", (req, res) => {
  Foods.find({ name: { $regex: `${req.query.name}` } }, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});

router.get("/foods", (req, res) => {
  Foods.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({ data: data });
    }
  });
});

module.exports = router;
