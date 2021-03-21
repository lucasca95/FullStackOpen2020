import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Weather from './Weather';



const Countries = (props) => {
  if (props.loading) return <p>Loading countries...</p>;
  if (props.countries.length > 10){
    return <p>Too many matches, specity another filter</p>;
  }
  if (props.countries.length === 1){
    return (
      <div>
        <h1>{props.countries[0].name}</h1>
        <p>capital {props.countries[0].capital}</p>
        <p>population {props.countries[0].population}</p>

        <h3>languages</h3>
        <ul>
          {props.countries[0].languages.map((l) => {
            return (
              <li key={l.iso639_2}>{l.name}</li>
            )
          })}
        </ul>
        <img width='200px' height='100%' alt='flag' src={props.countries[0].flag}/>
        <Weather name={props.countries[0].name}/>
      </div>
    );
  }
  return (
    <div>
      {props.countries.map((c) => {
        return (
          <div key={c.alpha3Code}>
            {c.name}
            <button onClick={() => props.showCountry(c.name)}>show</button>
          </div>
        );
      })}
    </div>
  );
}

export default Countries;