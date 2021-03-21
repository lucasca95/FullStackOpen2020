import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Weather = (props) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    console.log('inicia axios');
    axios
    .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.name}`)
    .then((response) => {
      console.log(response.data);
      if(response.data.current === undefined){
        // alert('Ops! Something went wrong! Try again, please')
      } else {
        const current = response.data.current;
        const weatherObject = {
          temperature: current.temperature,
          wind: current.wind_speed,
          image: current.weather_icons[0],
        };
        setWeather(weatherObject);
      }
    })
  }, [])

  return (
    <div>
      <h3>Wheather in {props.name}</h3>
        <p><strong>temperature:</strong>{weather.temperature} Celcius</p>
        <img src={weather.image} alt='weather img'></img>
        <p><strong>wind:</strong>{weather.wind}</p>
    </div>
  )
}

export default Weather;