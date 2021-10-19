import React from 'react'

const BgVideo = (props) => {
    const {weather} = props
    return (
        <div className="videoContainer">
            <video autoPlay muted loop playsInline id="background-video" key={weather.weather}>
      <source src={
  (!weather.weather ? "./sand.mp4" : '') ||
  (weather.weather === "Clouds" && "./clouds.mp4") ||
  (weather.weather === "Thunderstorm" && "./thunder.mp4") ||
  (weather.weather === "Clear" && "./clearsun.mp4") ||
  (weather.weather === "Drizzle" && "./lightrain.mp4") ||
  (weather.weather === "Rain" && "./heavyrain.mp4") ||
  (weather.weather === "Snow" && "./whitesnow.mp4") ||
  (weather.weather === "Atmosphere" && "./atmosphere.mp4")
            
    } type="video/mp4" />
  </video>
        </div>
    )
}

export default BgVideo
