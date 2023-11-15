import { useEffect, useState } from 'react';

function Message({ country, countries, setShowCountries }) {
  const [message, setMessage] = useState(null);

  const renderMessage = () => {
    if (country === '') {
      setShowCountries(false);
      setMessage('Enter country name');
      return;
    }
    if (country !== '' && countries.length === 0) {
      setShowCountries(false);
      setMessage('Countries not found :(');
      return;
    }
    if (country !== '' && countries.length >= 10) {
      setShowCountries(false);
      setMessage('Too many matches, specify another filter');
      return;
    }

    setShowCountries(true);
    setMessage(null);
  };

  useEffect(renderMessage, [country]);

  return <p>{message}</p>;
}

export default Message;
