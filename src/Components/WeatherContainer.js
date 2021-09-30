import React from 'react'
import moment from 'moment';
import 'moment-timezone'

const WeatherContainer = (props) => {

    const dateLocal = moment().tz(`${props.weather.timeZone}`).format('MMMM Do YYYY, h:mm a')

    const iconAPIurl = `http://openweathermap.org/img/w/${props.weather.weatherIcon}.png`

    return (
        <div>
            {
          props.error ? 
        <div className='display'>
            <h3>
            {props.error} 
            </h3>
        </div> 
        : !props.weather.weather ? 
        <div className='display'>
            <h2> Please enter a city name </h2>
        </div>
          : props.weather.stateName ?
        <div className='display'>
            <h2> {props.weather.cityName}, {props.weather.stateName} </h2>
            <h2> {props.weather.weather} </h2>
            <img src={iconAPIurl} alt="weather icon" />
            <h3> {props.weather.description}</h3>
            <h4> {Math.round(props.weather.temperature)} </h4>
            <p> High: {Math.round(props.weather.temperature_max)} </p>
            <p> Low: {Math.round(props.weather.temperature_min)} </p>
            <p> {dateLocal} </p>
        </div>
        : 
        <div className='display'>
            <h2> {props.weather.cityName} </h2>
            <h2> {props.weather.weather} </h2>
            <img src={iconAPIurl} alt="weather icon" />
            <h3> {props.weather.description}</h3>
            <h4> {Math.round(props.weather.temperature)} </h4>
            <p> High: {Math.round(props.weather.temperature_max)} </p>
            <p> Low: {Math.round(props.weather.temperature_min)} </p>
            <p> {dateLocal} </p>
        </div>
          }
        </div>
    )
}

export default WeatherContainer