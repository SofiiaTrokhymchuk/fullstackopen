import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleCountry from './components/SingleCountry';
import Message from './components/Message';
import Countries from './components/Countries';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState(null);
  const [showCountries, setShowCountries] = useState(false);
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

      <Message
        country={country}
        countries={filteredCountries}
        setShowCountries={setShowCountries}
      />
      <>
        {showCountries &&
          (filteredCountries.length > 1 ? (
            <Countries countries={filteredCountries} />
          ) : (
            <SingleCountry country={filteredCountries[0]} />
          ))}
      </>
    </div>
  );
}

export default App;
