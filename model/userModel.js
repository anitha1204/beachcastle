const mongoose = require("mongoose");

const userbeachcastleSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enquiry: { type: String, required: true },
}, { timestamps: true });

const userbeachcastleDB = mongoose.model("BeachCastleUser", userbeachcastleSchema);
module.exports = userbeachcastleDB;
