const express = require("express");
const Users = require("../models/users");
var bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await Users.findOne({ email: data.email });
  if (oldUser) {
    return res
      .status(400)
      .json({ success: false, status: "Та аль хэдийн бүртгүүлсэн байна" });
  } else {
    let hashedPassword = await bcrypt.hashSync(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");

    let newUsers = new Users({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      address: req.body.address,
      role_id: data.role_id,
      created_date: req.body.created_date,
      last_activity: req.body.last_activity,
    });
    newUsers
      .save()
      .then((data) => {
        console.log(data);
        email = data.email;
        const token = jwt.sign(
          { user_id: data._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
        return;
      })
      .catch(next);
  }
};

const login = async (req, res, next) => {
  const data = req.body;
  const email = data.email;
  const User = await Users.findOne({ email: data.email });
  console.log(data);
  if (email == null || data.password == null) {
    res
      .status(400)
      .json({ message: "Хэрэглэгчийн нэр эсвэл нууц үг хоосон байна" });
    return;
  }
  if (User && (await bcrypt.compare(data.password, User.password))) {
    const token = jwt.sign(
      { user_id: User._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({
      success: true,
      data: User,
      token: token,
    });
    return;
  } else {
    return res.send({
      message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.",
    });
  }
};

module.exports = { register, login };
