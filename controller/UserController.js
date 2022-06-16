const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { json } = require("express/lib/response");

const getUsers = (req, res) => {
  Users.find({}, function (err, data) {
    if (err) {
      next;
    } else {
      return res.json({
        data: data,
      });
    }
  });
};

const deleteUsers = () => {
  const reqBody = req.body;
  console.log(reqBody);
  let usersName = {
    name: "Hongorzul",
  };
  Users.findOneAndDelete({ name: req.body.name }, usersName, (err, data) => {
    if (err) next;
    res.send("delete");
  });
};

const updateUsers = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody);
  let updateUser = {
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };
  Users.findOneAndUpdate({ name: req.body.name }, updateUser, (err, data) => {
    if (err) next;
    res.send("update yes");
  });
};

const createUsers = (req, res, next) => {
  const reqBody = req.body;
  console.log(reqBody.name);
  let newUsers = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    role_id: req.body.role_id,
    created_date: req.body.created_date,
    last_activity: req.body.last_activity,
  });
  newUsers
    .save()
    .then((data) => {
      res.status(201).json({
        message: "Success",
        data: data,
      });
    })
    .catch(next);
};

module.exports = { getUsers, deleteUsers, updateUsers, createUsers };
