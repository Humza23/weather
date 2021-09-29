import React, {useState, useEffect} from 'react'
import moment from 'moment';
import axios from 'axios';
import 'moment-timezone'

const WeatherContainer = (props) => {
    const [timeZone, setTimeZone] = useState()
    const [time, setTime] = useState()

    // const dateState = moment().format('MMMM Do YYYY, h:mm a').tz(`America/${props.weather.stateName}`)
    // console.log(dateState);
    // const dateCountry = moment().tz(`America/Los_Angeles`).format('MMMM Do YYYY, h:mm a')
    
    useEffect(() => {
        axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=J4CW56V87PEA&format=json&by=position&lat=${props.weather.lat}&lng=${props.weather.lon}`)
        .then((res) => {
            console.log(res.data);
            // console.log(res.data.zoneName);
            setTimeZone(res.data.zoneName)
            // console.log(dateState);
            setTime(moment().tz(`${timeZone}`).format('MMMM Do YYYY, h:mm a'))
            console.log(time);
        })
        .catch((err => {
            console.log(err);
        }))
    }, []);
    
    // const dateState = moment().tz(`${timeZone}`).format('MMMM Do YYYY, h:mm a')



    // const getLocalTime = () => {
    //     axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=J4CW56V87PEA&format=json&by=position&lat=${props.weather.lat}&lng=${props.weather.lon}`)
    //     .then((res) => {
    //         console.log(res.data.zoneName);
    //         setTimeZone(res.data.zoneName)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }
    // console.log(getLocalTime())

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
            {/* <h5> {dateState} </h5> */}
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
            {/* <h5> {dateCountry} </h5> */}
        </div>
          }
        </div>
    )
}

export default WeatherContainer