import axios from "axios";
import { useState, useEffect } from "react";

const CountryView = ({ showCountryInfo, countriesToShow }) => {
  const [latitude, longitude] = countriesToShow[0].capitalInfo.latlng;
  const APIkey = import.meta.env.VITE_SOME_KEY;
  const [weatherData, setWeatherData] = useState([]);
  const [iconId, setIconId] = useState("");

  const baseWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;
  console.log(weatherData);

  useEffect(() => {
    axios
      .get(baseWeatherURL)
      .then((response) => {
        setWeatherData(response.data);
        setIconId(response.data.weather?.[0].icon);
      })
      .catch((error) => {
        console.error("Error fetching weather: ", error);
        setWeatherData(null);
      });
  }, [baseWeatherURL]);
  const styleVisibility = showCountryInfo ? "visible" : "hidden";
  return (
    <div style={{ visibility: styleVisibility }}>
      <h2>{countriesToShow[0].name.common}</h2>
      <p>Capital: {countriesToShow[0].capital?.[0]}</p>
      <h4>Languages</h4>
      <ul>
        {Object.entries(countriesToShow[0].languages).map(([key, lang]) => (
          <li key={key}>{lang}</li>
        ))}
      </ul>
      <br></br>
      <img
        src={countriesToShow[0].flags?.png}
        alt={`Flag of ${countriesToShow[0].name.common}`}
      />
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main?.temp} °C</p>
          {weatherData.weather?.[0] && (
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <p>Wind {weatherData.wind.speed}m/s</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryView;
