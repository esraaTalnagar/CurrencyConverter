// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useEffect , useState} from 'react';
import './styles.css';
import Exchange from './assets/Exchange.svg'
import CurrencyFlag from './components/Flag';

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [output, setOutput] = useState(null);
  const [isLoading , setIsLoading] = useState(false)

  useEffect(() => {
    async function Convert() {
      setIsLoading(true);
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyTo}`);
      const data = await response.json();
      if (data.rates && data.rates[currencyTo] !== undefined) {
        setOutput(data.rates[currencyTo]);
      } else {
        setOutput(null);
      }
      setIsLoading(false)
    }
    if (currencyFrom === currencyTo) {
      setOutput(amount);
      return;
    }

    Convert();
  }, [amount, currencyFrom, currencyTo]);


  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="container">
        <div className="From">
          <div className="From-flag">
            <CurrencyFlag currency={currencyFrom} />
          </div>
          <select
            value={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <img src={Exchange} alt="Exchange Icon" className="exchange-icon" />
        <div className="To">
          <div className="To-flag">
            <CurrencyFlag currency={currencyTo} />
          </div>
          <select
            value={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
            <input
              type="number"
              value={output !== null ? output : ''}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
        </div>
        <p>
          {output !== null
            ? `${amount} ${currencyFrom} = ${output} ${currencyTo}`
            : ""}
        </p>
      </div>
    </div>
  );
}
