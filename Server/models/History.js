const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  todayWeather: [{ type: Types.ObjectId, schema: 'TodayWeather' }],
  weekWeather: [{ type: Types.ObjectId, schema: 'WeekWeather' }],
  inputWeather: { type: Types.ObjectId, schema: 'InputWeather' },
  dateAndTime: { type: Date, required: true },
  location: { type: String, required: true },
});

module.exports = model('History', schema);