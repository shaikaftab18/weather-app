const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
  city: String,
  main: String,
  temp: Number,
  feels_like: Number,
  dt: Date,
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;