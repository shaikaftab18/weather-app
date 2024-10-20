const { WeatherData } = require('./models');
const config = require('./config');

async function checkAlerts(city) {
  const { temperature: threshold_temp, consecutiveUpdates } = config.alertThresholds;

  // Fetch the latest weather data for the city
  const latest_data = await WeatherData.find({ city }).sort({ dt: -1 }).limit(consecutiveUpdates);

  // Check if we have enough data points
  if (latest_data.length < consecutiveUpdates) {
    console.log(`Not enough data points to check alerts for ${city}`);
    return;
  }

  // Check if the temperature exceeds the threshold for the specified number of consecutive updates
  const threshold_exceeded = latest_data.every(data => data.temp > threshold_temp);

  if (threshold_exceeded) {
    console.log(`Alert: Temperature in ${city} exceeded ${threshold_temp}°C for ${consecutiveUpdates} consecutive updates`);
    // Here you can add additional logic to send email notifications or other alert mechanisms
  }
}

module.exports = { checkAlerts };