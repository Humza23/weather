import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherContainer from './WeatherContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const initialWeather = [{
  cityName: '',
  stateName: '',
  country: '',
  weather: '',
  description: '',
  weatherIcon: '',
  temperature: '',
  temperature_max: '',
  temperature_min: '',
  lon: '',
  lat: '',
}]

const Weather = () => {

    const [city, setCity] = useState('')
    const [error, setError] = useState('')
    const [weather, setWeather] = useState(initialWeather)
    
    const handleChange = (e) => {
      setCity(e.target.value);
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
      getWeather()
    }
    
    const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_WEATHER_TOKEN}`


  const getWeather = () => {
    axios.get(weatherAPIurl) 
    .then((responseA) =>
        Promise.all([
          responseA,
          axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${responseA.data.coord.lat}&lon=${responseA.data.coord.lon}&limit=5&appid=00b908352099ba90a12ecbd4a449112b`)
        ])   
    )
    .then(
      ([responseA,responseB]) => {
        console.log('resA', responseA);
        console.log(responseB.data[0].state);
        setWeather({...weather, 
          cityName: responseA.data.name,
          country: responseA.data.sys.country,
          weather: responseA.data.weather[0].main,
          description: responseA.data.weather[0].description,
          temperature: responseA.data.main.temp,
          temperature_max: responseA.data.main.temp_max,
          temperature_min: responseA.data.main.temp_min,
          weatherIcon: responseA.data.weather[0].icon,
          lon: responseA.data.coord.lon,
          lat: responseA.data.coord.lat,
          stateName: responseB.data[0].state
        })
        setError('')
    })
    .catch((err) => {
        console.log(err.message);
        setError('Please enter a valid City name')
    });
  }

    return (
      <div className="weatherContainer">
          <form onSubmit={handleSubmit}>
            <input type="text" name="City" value={city} placeholder="Search for a city" onChange={handleChange} />
            <FontAwesomeIcon className="searchbtn" icon={faSearch} onClick={handleSubmit}/>
          </form>
          <WeatherContainer weather={weather} city={city} error={error} />
      </div>
    )
}

export default Weather