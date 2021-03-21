import React, { useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import Countries from './Countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(`GET all the countries`);
      setCountries(response.data);
      // console.log(response.data);
      setLoading(false);
    })
  }, [])

  const [ newSearch, setNewSearch ] = useState('');
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
    setFilterCountries(countries.filter((c) => {
      return c.name.toUpperCase().includes(event.target.value.toUpperCase());
    }))
  }
  
  const showCountry = (n) => {
    // setNewSearch(n); // set country name to search input
    setFilterCountries(countries.filter((c) => {
      return c.name.toUpperCase().includes(n.toUpperCase());
    }))
  }

  return (
    <div>
      <span>find countries</span>
      &nbsp;
      <SearchFilter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <Countries loading={loading} countries={filterCountries} showCountry={showCountry}/>
    </div>
  );
}

export default App;