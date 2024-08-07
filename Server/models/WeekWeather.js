const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  serviceId: { type: Types.ObjectId, schema: 'Services' },
  weatherByDays: [{ type: Object, required: true }],
  dateAndTime: { type: Date, required: true },
  location: { type: String, required: true },
});

module.exports = model('WeekWeather', schema);