const axios = require('axios');

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

async function getWeatherData(lat, lon) {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min,weathercode,humidity_2m_max,humidity_2m_min,windspeed_10m_max,windspeed_10m_min',
      timezone: 'Asia/Kolkata',
    },
  });
  return response.data;
}

module.exports = { getWeatherData };