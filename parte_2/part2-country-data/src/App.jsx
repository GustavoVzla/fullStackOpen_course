import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null);
  };

  const handleShowDetail = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <div>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (
            <CountryList
              countries={filteredCountries}
              handleShowDetail={handleShowDetail}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
