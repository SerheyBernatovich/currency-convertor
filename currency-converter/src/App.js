import './App.css';
import CurrencyInput from './CurrencyInput';
import { useState, useEffect } from 'react';

function App() {
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .then((rec) => rec.json())
      .then((json) => {
        rates.current = json.reduce(
          (acc, val) => {
            acc[val.cc] = val.rate;
            return acc;
          },
          { UAH: 1 }
        );
        setRates(rates.current);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmountFromChang(1);
    }
  }, [rates]);

  const fix = (number) => number.toFixed(2);

  const handleAmountFromChang = (fromAmount) => {
    setToAmount(fix((fromAmount * rates[fromCurrency]) / rates[toCurrency]));
    setFromAmount(fromAmount);
  };

  const handleCurrencyFromChang = (fromCurrency) => {
    setToAmount(fix((fromAmount * rates[fromCurrency]) / rates[toCurrency]));
    setFromCurrency(fromCurrency);
  };

  const handleAmountToChang = (toAmount) => {
    setFromAmount(fix((toAmount * rates[toCurrency]) / rates[fromCurrency]));
    setToAmount(toAmount);
  };

  const handleCurrencyToChang = (toCurrency) => {
    setFromAmount(fix((toAmount * rates[toCurrency]) / rates[fromCurrency]));
    setToCurrency(toCurrency);
  };
  return (
    <div>
      <h1>Currency Convertor</h1>
      <CurrencyInput
        onCurrencyChange={handleCurrencyFromChang}
        onAmountChange={handleAmountFromChang}
        currencies={Object.keys(rates)}
        amount={fromAmount}
        currency={fromCurrency}
      />
      <CurrencyInput
        onCurrencyChange={handleCurrencyToChang}
        onAmountChange={handleAmountToChang}
        currencies={Object.keys(rates)}
        amount={toAmount}
        currency={toCurrency}
      />
    </div>
  );
}

export default App;
