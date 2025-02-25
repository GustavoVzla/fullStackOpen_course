const CountryList = ({ countries, handleShowDetail }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShowDetail(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
