const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { DailySummary } = require('./models');
const { processWeatherData } = require('./dataProcessing');
const { checkAlerts } = require('./alerting');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/summaries/:city', async (req, res) => {
  try {
    const city = req.params.city;
    console.log(`Fetching summaries for city: ${city}`); // Debug log

    const summaries = await DailySummary.find({ city });
    console.log(`Query result: ${JSON.stringify(summaries)}`); // Debug log

    if (summaries.length === 0) {
      console.log(`No summaries found for city: ${city}`); // Debug log
    }

    res.json(summaries);
  } catch (error) {
    console.error(`Error fetching summaries: ${error.message}`); // Debug log
    res.status(500).send('Internal Server Error');
  }
});

// Schedule data fetching every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const cities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.209 },
    { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Hyderabad', lat: 17.385, lon: 78.4867 },
  ];

  for (const city of cities) {
    try {
      await processWeatherData(city.name, city.lat, city.lon);
      console.log(`Weather data for ${city.name} processed and stored.`);

      // Check alerts for the city
      await checkAlerts(city.name);
    } catch (error) {
      console.error(`Error processing weather data for ${city.name}: ${error.message}`);
    }
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});