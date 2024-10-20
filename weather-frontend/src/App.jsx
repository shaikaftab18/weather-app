import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Delhi');

  const cities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.209 },
    { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Hyderabad', lat: 17.385, lon: 78.4867 },
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/summaries/${selectedCity}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        const uniqueSummaries = new Map();
        data.forEach(summary => {
          const date = new Date(summary.date).toLocaleDateString();
          if (!uniqueSummaries.has(date)) {
            uniqueSummaries.set(date, summary);
          }
        });
        setSummaries(Array.from(uniqueSummaries.values()));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
      });
  }, [selectedCity]);

  const weatherConditionMap = {
    0: { label: 'Clear', image: '/images/clear.jpeg' },
    1: { label: 'Partly Cloudy', image: '/images/partly_cloudy.jpeg' },
    2: { label: 'Cloudy', image: '/images/cloudy.jpeg' },
    3: { label: 'Rain', image: '/images/rain.jpeg' },
    4: { label: 'Snow', image: '/images/snow.jpeg' },
    5: { label: 'Unknown', image: '/images/Unknown.jpeg' },
  };

  return (
    <div className="container">
      <h1>Weather Summaries</h1>
      <div className="city-selector">
        <label htmlFor="city">Select City: </label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error">Error fetching data: {error.message}</p>}
      <ul className="weather-list">
        {summaries.map((summary, index) => (
          <li key={index} className="weather-item">
            <p className="date">Date: {new Date(summary.date).toLocaleDateString()}</p>
            <p>Average Temperature: {summary.avg_temp?.toFixed(2) ?? 'N/A'}°C</p>
            <p>Max Temperature: {summary.max_temp ?? 'N/A'}°C</p>
            <p>Min Temperature: {summary.min_temp ?? 'N/A'}°C</p>
            <p>
              Dominant Condition: {weatherConditionMap[summary.dominant_condition]?.label ?? 'Unknown'}
              <img
                src={weatherConditionMap[summary.dominant_condition]?.image ?? '/images/Unknown.jpeg'}
                alt={weatherConditionMap[summary.dominant_condition]?.label ?? 'Unknown'}
                className="weather-icon"
              />
            </p>
            <p>Average Humidity: {summary.avg_humidity?.toFixed(2) ?? 'N/A'}%</p>
            <p>Max Humidity: {summary.max_humidity ?? 'N/A'}%</p>
            <p>Min Humidity: {summary.min_humidity ?? 'N/A'}%</p>
            <p>Average Wind Speed: {summary.avg_windspeed?.toFixed(2) ?? 'N/A'} m/s</p>
            <p>Max Wind Speed: {summary.max_windspeed ?? 'N/A'} m/s</p>
            <p>Min Wind Speed: {summary.min_windspeed ?? 'N/A'} m/s</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;