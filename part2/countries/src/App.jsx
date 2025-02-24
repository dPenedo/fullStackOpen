import axios from "axios";
import { useState, useEffect } from "react";
import CountryView from "./components/CountryView";

function App() {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [showCountryInfo, setShowCountryInfo] = useState({});

  // Fetch the JSON data for countries
  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Filters countries that match newFilter
  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toUpperCase().includes(newFilter.toUpperCase()),
    );
    setCountriesToShow(filteredCountries);
  }, [newFilter, countries]);

  const handleChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleClickCountryShow = (countryCode) => {
    setShowCountryInfo((prev) => ({
      ...prev,
      [countryCode]: !prev[countryCode], // Toggle visibility for the specific country
    }));
  };

  return (
    <>
      <form>
        <p>Find countries</p>
        <input onChange={handleChange} type="text" />
      </form>

      {!newFilter ? (
        <div>Enter a text to filter countries</div>
      ) : countriesToShow.length === 1 ? (
        <CountryView showCountryInfo={true} countriesToShow={countriesToShow} />
      ) : countriesToShow.length === 0 ? (
        <div>No matches for this name</div>
      ) : countriesToShow.length > 10 ? (
        <div>Too many matches, specify another name</div>
      ) : (
        <ul>
          {countriesToShow.map((country) => (
            <li key={country.cca3}>
              <p>{country.name.common}</p>
              <button onClick={() => handleClickCountryShow(country.cca3)}>
                {showCountryInfo[country.cca3] ? "Hide" : "Show"}
              </button>
              {showCountryInfo[country.cca3] && (
                <CountryView
                  showCountryInfo={true}
                  countriesToShow={[country]}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
