const { kelvinToCelsius } = require('./utils');
const { processWeatherData, calculateDailySummary } = require('./dataProcessing');
const { checkAlerts } = require('./alerting');
const { WeatherData, DailySummary } = require('./models');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('Temperature conversion from Kelvin to Celsius', () => {
  expect(kelvinToCelsius(273.15)).toBeCloseTo(0);
  expect(kelvinToCelsius(300)).toBeCloseTo(26.85);
});

test('Process and store weather data', async () => {
  await processWeatherData('TestCity', 28.6139, 77.209);
  const weatherData = await WeatherData.findOne({ city: 'TestCity' });
  expect(weatherData).toBeTruthy();
  expect(weatherData.city).toBe('TestCity');
});

test('Calculate daily summary', async () => {
  await processWeatherData('TestCity', 28.6139, 77.209);
  await calculateDailySummary('TestCity', new Date());
  const summary = await DailySummary.findOne({ city: 'TestCity' });
  expect(summary).toBeTruthy();
  expect(summary.city).toBe('TestCity');
});

test('Check alerts', async () => {
  await processWeatherData('TestCity', 28.6139, 77.209);
  await checkAlerts('TestCity', 35);
  // Check console output for alert message
});