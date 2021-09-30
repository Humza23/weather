import React, {useState} from 'react'
import axios from 'axios'
import WeatherContainer from './WeatherContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import 'moment-timezone'


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
  time: '',
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
          axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${responseA.data.coord.lat}&lon=${responseA.data.coord.lon}&apiKey=${process.env.REACT_APP_GEOCODING_TOKEN}`),
          axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=J4CW56V87PEA&format=json&by=position&lat=${responseA.data.coord.lat}&lng=${responseA.data.coord.lon}`),
        ])   
    )
    .then(
      ([responseA,responseB, responseC]) => {
        console.log('resA', responseA.data);
        console.log('resB', responseB.data.features[0].properties.state);
        console.log('resC', responseC.data.zoneName);
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
          stateName: responseB.data.features[0].properties.state,
          time: moment().tz(`${responseC.data.zoneName}`).format('MMMM Do YYYY, h:mm a')
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