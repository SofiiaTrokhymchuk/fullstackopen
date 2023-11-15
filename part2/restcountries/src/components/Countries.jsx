import CountryItem from './CountryItem';
import SingleCountry from './SingleCountry';

function Countries({ countries, country }) {
  if (country === '') return <p>Enter country name</p>;
  if (countries.length >= 10) {
    return <p>Too many matches, specify filter more</p>;
  }
  if (countries.length === 1) {
    return <SingleCountry country={countries[0]} />;
  }
  if (countries.length === 0) {
    return <p>Countries not found :(</p>;
  }

  return (
    <ul>
      {countries.map((c) => (
        <CountryItem
          key={c.name.common}
          country={c}
        />
      ))}
    </ul>
  );
}

export default Countries;
