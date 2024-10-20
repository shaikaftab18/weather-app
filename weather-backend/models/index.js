const mongoose = require('mongoose');

// Replace <db_password> with your actual database password
const mongoURI = 'mongodb+srv://shaikaftab171:qdjFw3ZTgQk3A6cS@cluster0.osa8v.mongodb.net/weather?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const WeatherData = require('./WeatherData');
const DailySummary = require('./DailySummary');

module.exports = { WeatherData, DailySummary };
