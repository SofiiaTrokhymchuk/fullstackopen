import { useEffect, useState } from 'react';
import axios from 'axios';
const api_key = import.meta.env.VITE_API_KEY;

function SingleCountry({ country }) {
  const [weather, setWeather] = useState(null);
  const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        console.log(res.data);
        setWeather({
          temp: res.data.main.temp,
          wind: res.data.wind.speed,
          icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        });
      });
  };

  useEffect(fetchWeather, []);

  if (!country) return;

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <br />
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((l) => {
          return <li key={l}>{l}</li>;
        })}
      </ul>
      <img
        alt={country.flags.alt}
        src={country.flags.png}
        height={150}
      />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather?.temp} Celcius </p>
      <img
        src={weather?.icon}
        alt='weather'
        height={100}
      />
      <p>wind {weather?.wind}m/s</p>
    </div>
  );
}

export default SingleCountry;
