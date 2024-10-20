const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
  city: String,
  date: Date,
  avg_temp: Number,
  max_temp: Number,
  min_temp: Number,
  dominant_condition: String,
  avg_humidity: Number,
  max_humidity: Number,
  min_humidity: Number,
  avg_windspeed: Number,
  max_windspeed: Number,
  min_windspeed: Number,
});

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = DailySummary;