import React, {useState} from 'react'
import moment from 'moment';
import axios from 'axios';

const WeatherContainer = (props) => {
    const date = moment().format('MMMM Do YYYY, h:mm a')

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
          : 
        <div className='display'>

            <h2> {props.weather.cityName}, {props.stateName} </h2>
            <h2> {props.weather.weather} </h2>
            <img src={iconAPIurl} alt="weather icon" />
            <h3> {props.weather.description}</h3>
            <h4> {Math.round(props.weather.temperature)} </h4>
            <p> High: {Math.round(props.weather.temperature_max)} </p>
            <p> Low: {Math.round(props.weather.temperature_min)} </p>
            <h5> {date} </h5>
        </div>
          }
        </div>
    )
}

export default WeatherContainer