import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherContainer from './WeatherContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faSearch } from '@fortawesome/free-solid-svg-icons'


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
    // const urlState = `http://api.openweathermap.org/geo/1.0/reverse?lat=${weather.lat}&lon=${weather.lon}&limit=5&appid=00b908352099ba90a12ecbd4a449112b`

    useEffect(() => {
      axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${weather.lat}&lon=${weather.lon}&limit=5&appid=00b908352099ba90a12ecbd4a449112b`)
      .then((res) => {
        setWeather({...weather, stateName: res.data[0].state})
      })
      .catch((err => {
          console.log(err);
      }))
  }, []);


    const getWeather = () => {
      axios.get(weatherAPIurl)
      .then((res) => {
        console.log(res.data.name);
        setWeather({...weather, 
          cityName: res.data.name,
          country: res.data.sys.country,
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          temperature: res.data.main.temp,
          temperature_max: res.data.main.temp_max,
          temperature_min: res.data.main.temp_min,
          weatherIcon: res.data.weather[0].icon,
          lon: res.data.coord.lon,
          lat: res.data.coord.lat
        })
        setError('')
      })
      .catch((err => {
        console.log(err);
        setError('Please enter a valid City name')
      }))
    }

    return (
      <div className="weatherContainer">
          <form onSubmit={handleSubmit}>
            <input type="text" name="City" value={city} placeholder="Search for a city" onChange={handleChange} />
            <FontAwesomeIcon icon={faSearch} onClick={handleSubmit}/>
          </form>
          <WeatherContainer weather={weather} city={city} error={error} />
      </div>
    )
}

export default Weather