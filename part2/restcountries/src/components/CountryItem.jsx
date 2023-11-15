import { useState } from 'react';
import SingleCountry from './SingleCountry';

function CountryItem({ country }) {
  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => {
    setShowFull(!showFull);
  };
  return (
    <li>
      <span>{country.name.common}</span>
      <button onClick={toggleShow}>{showFull ? 'hide' : 'show'}</button>
      {showFull && <SingleCountry country={country} />}
    </li>
  );
}

export default CountryItem;
