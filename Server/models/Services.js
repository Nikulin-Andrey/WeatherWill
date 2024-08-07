const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  veracity: { type: Object, required: true }
});

module.exports = model('Services', schema);