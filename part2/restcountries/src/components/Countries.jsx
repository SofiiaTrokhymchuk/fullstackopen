import CountryItem from './CountryItem';

function Countries({ countries }) {
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
