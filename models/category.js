const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = mongoose.connection;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter the name!"],
  },
  color: {
    type: String,
    required: [true, "Enter the color!"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
