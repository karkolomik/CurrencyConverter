import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  //   const [rates, setrates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const ratesRef = useRef({});

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        console.log(ratesRef);
        onChangeFromPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Something went wrong!");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (fromPrice) => {
    const priceCount =
      (ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) *
      fromPrice;
    setToPrice(priceCount.toFixed(3));
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(fromPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <hr></hr>
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
      <button
        onClick={() => {
          setToPrice(0);
          setFromPrice(0);
        }}
      >
        Reset to 0!
      </button>
    </div>
  );
}

export default App;
