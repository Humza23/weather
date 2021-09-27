import React, {useState} from 'react'

const Weather = () => {

    const [inputLocation, setInputLocation] = useState('Brooklyn');
    const [currentDate, setCurrentDate] = useState('');
    const [location, setLocation] = useState({
      city: '',
      state: '',
      country: ''
    });
    const [weather, setWeather] = useState({
      currentTemp: 0,
      weatherMain: '',
      tempMax: 0,
      tempMin: 0
    });



    return (
        <div>
            
        </div>
    )
}

export default Weather