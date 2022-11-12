import React from 'react';

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {
  const [defaultCurrencies, setdefaultCurrencies] = React.useState([]);

  React.useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((res) => res.json())

      .then((json) => {
        setdefaultCurrencies(json.map(({ cc }) => cc).slice(0, 3));
      })
      .catch((err) => {
        console.warn(err);
        alert('Error');
      });
  }, []);
  return (
    <div className="block">
      <ul className="currencies">
        {defaultCurrencies.map((cur) => (
          <span
            onClick={() => onChangeCurrency(cur)}
            className={currency === cur ? 'active' : ''}
            key={cur}
          >
            {cur}
          </span>
        ))}
        <span>
          <svg height="50px" viewBox="0 0 50 50" width="50px">
            <rect fill="none" height="50" width="50" />
            <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
          </svg>
        </span>
      </ul>
      <input
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number"
        placeholder={0}
      />
    </div>
  );
};
