import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState(null);
  const filteredCountries =
    country === ''
      ? countries
      : countries.filter((c) =>
          c.name.common.toLowerCase().includes(country.toLowerCase())
        );

  const fetchCountries = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => res.data)
      .then((data) => data.map((c) => c))
      .then((countries) => setCountries(countries));
  };

  useEffect(fetchCountries, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  if (!countries) return;

  return (
    <div>
      <form>
        find countries{' '}
        <input
          value={country}
          onChange={handleCountryChange}
        />
      </form>
      <Countries
        countries={filteredCountries}
        country={country}
      />
    </div>
  );
}

export default App;
