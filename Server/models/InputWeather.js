const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  weaherData: { type: Object, required: true },
  adminId: { type: Types.ObjectId, schema: 'Users' },
  dateAndTime: { type: Date, required: true },
  location: { type: String, required: true },
});

module.exports = model('InputWeather', schema);