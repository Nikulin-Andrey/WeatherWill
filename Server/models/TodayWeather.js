const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  serviceId: { type: Types.ObjectId, schema: 'Services' },
  weatherByHours: [{ type: Object, required: true }],
  otherWeather: { type: Object, required: true },
  dateAndTime: { type: Date, required: true },
  location: { type: String, required: true },
});

module.exports = model('TodayWeather', schema);