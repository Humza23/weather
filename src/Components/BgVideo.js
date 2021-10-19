import React from 'react'

const BgVideo = (props) => {
    const {weather} = props
    return (
        <div className="videoContainer">
            <video autoPlay muted loop id="background-video" key={weather.weather}>
      <source src={
  (!weather.weather ? "./sand.mp4" : '') ||
  (weather.weather === "Clouds" && "./clouds.mp4") ||
  (weather.weather === "Thunderstorm" && "./thunder.mp4") ||
  (weather.weather === "Clear" && "./sand.mp4") 
  // (weather.weather === "flying" && "#3dc7ef") ||
  // (weather.weather === "water" && "#4592c4") ||
  // (weather.weather === "bug" && "#729f3f") ||
  // (weather.weather === "normal" && "#a4acaf") ||
  // (weather.weather === "electric" && "#eed535") ||
  // (weather.weather === "ground" && "#ab9842") ||
  // (weather.weather === "fairy" && "#fdb9e9") ||
  // (weather.weather === "fighting" && "#d56723") ||
  // (weather.weather === "psychic" && "#f366b9") ||
  // (weather.weather === "rock" && "#a38c21") ||
  // (weather.weather === "steel" && "#9eb7b8") ||
  // (weather.weather === "ghost" && "#7b62a3") ||
  // (weather.weather === "ice" && "#51c4e7") ||
  // (weather.weather === "dragon" && "#f16e57")
            
    } type="video/mp4" />
  </video>
        </div>
    )
}

export default BgVideo
