const mongoose = require("mongoose");
const category = require("./category");
const Schema = mongoose.Schema;
const db = mongoose.connection;

const foodSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  sales: {
    type: Number,
    required: [true, "Enter the sales!"],
  },

  name: {
    type: String,
    required: [true, "Enter the name!"],
  },
  price: {
    type: Number,
    required: [true, "Enter the type!"],
  },
  portion: {
    type: Number,
    required: [true, "Enter the portion"],
  },
  stock: {
    type: Number,
    required: [true, "Enter the stock!"],
  },
  image: {
    type: String,
    required: [true, "Enter the image!"],
  },
  tumb_img: {
    type: String,
    required: [true, "Enter the tumbimg!"],
  },
  ingredients: {
    type: String,
    required: [true, "Enter the ingredients!"],
  },
  discount: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

module.exports = mongoose.model("foods", foodSchema);
