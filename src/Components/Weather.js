import React, {useState} from 'react'
import axios from 'axios'


const initialWeather = [{
  weather: '',
  temperature: '',
  description: '',
  temperature_max: '',
  temperature_min: '',
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

    const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_TOKEN}`
    // console.log(weatherAPIurl);

    const getWeather = () => {
      axios.get(weatherAPIurl)
      .then((res) => {
        console.log(res.data.main.temp);
        setWeather({...weather, 
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description
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
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <label>
              City:
            <input type="text" name="City" value={city} placeholder="Search for a city" onChange={handleChange} />
            </label>
            <input type="submit" value="Search" />
          </form>
        </div>
          {
          error ? 
        <div className='display'>
            <h1>
            {error} 
            </h1>
        </div>
          : 
        <div className='display'>
            <h2> {weather.weather} </h2>
            <h3> {weather.description}</h3>
        </div>
          }
      </div>
    )
}

export default Weather