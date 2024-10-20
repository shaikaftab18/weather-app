const { WeatherData, DailySummary } = require('./models');
const { getWeatherData } = require('./weatherApi');

async function processWeatherData(city, lat, lon) {
  const data = await getWeatherData(lat, lon);
  const daily = data.daily;

  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    const max_temp = daily.temperature_2m_max[i];
    const min_temp = daily.temperature_2m_min[i];
    const weather_code = daily.weathercode[i];
    const max_humidity = daily.humidity_2m_max[i];
    const min_humidity = daily.humidity_2m_min[i];
    const max_windspeed = daily.windspeed_10m_max[i];
    const min_windspeed = daily.windspeed_10m_min[i];

    const summary = new DailySummary({
      city,
      date,
      avg_temp: (max_temp + min_temp) / 2,
      max_temp,
      min_temp,
      dominant_condition: weather_code, // You might want to map this to a more readable format
      avg_humidity: (max_humidity + min_humidity) / 2,
      max_humidity,
      min_humidity,
      avg_windspeed: (max_windspeed + min_windspeed) / 2,
      max_windspeed,
      min_windspeed,
    });
    await summary.save();
  }
}

module.exports = { processWeatherData };