export const getCurrencyRates = () =>
  fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then((rec) => rec.json())
    .then((json) =>
      json.reduce(
        (acc, val) => {
          acc[val.cc] = val.rate;
          return acc;
        },
        { UAH: 1 }
      )
    );
