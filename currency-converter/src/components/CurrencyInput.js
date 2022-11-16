import './CurrencyInput.css';

function CurrencyInput({
  currency,
  amount,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) {
  return (
    <div className="group">
      <input
        type="text"
        value={amount}
        onChange={(event) => onAmountChange(event.target.value)}
      />
      <select
        value={currency}
        onChange={(event) => onCurrencyChange(event.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
export default CurrencyInput;
