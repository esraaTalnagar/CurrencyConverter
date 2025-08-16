const currencyToCountry = {
  USD: "us", // United States
  EUR: "eu", // European Union
  CAD: "ca", // Canada
  INR: "in", // India
};

export default function CurrencyFlag({ currency }) {
  const countryCode = currencyToCountry[currency];
  if (!countryCode) return <span></span>; // fallback if not mapped

  return (
    <img
      src={`https://flagcdn.com/48x36/${countryCode}.png`}
      alt={`${currency} flag`}
      width={50}
      height={36}
    />
  );
}
