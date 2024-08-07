const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, default: "" },
  role: { type: String, default: "admin" }
});

module.exports = model('Users', schema);