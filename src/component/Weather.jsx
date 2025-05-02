import React, { useRef } from 'react'
import './Weather.css'
import cloudImage from '../assets/cloud.png'
import clearImage from '../assets/clear.png'
import drizzleImage from '../assets/drizzle.png'
import humidityImage from '../assets/humidity.png'
import rainImage from '../assets/rain.png'
import searchImage from '../assets/search.png'
import snowImage from '../assets/snow.png'
import windImage from '../assets/wind.png'
import { useEffect, useState } from 'react'


const Weather = () => {
  const [weatherData, setweatherData] = useState(false)
  const allIcons ={
    "01d":clearImage,
    "01n":clearImage,
    "02d":cloudImage,
    "02n":cloudImage,
    "03d":cloudImage,
    "03n":cloudImage,
    "04d":drizzleImage,
    "04n":drizzleImage,
    "09d":rainImage,
    "09n":rainImage,
    "10d":rainImage,
    "10n":rainImage,
    "13d":snowImage,
    "13n":snowImage,
  }
  const search = async(city) =>{
    if(city === ""){
      alert("Enter the city to get the Data");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5a145bea0ecdd1b2679ad3c69cf8c6b6`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clearImage;
      setweatherData({
        humidity:data.main.humidity,
        temperature:Math.floor(data.main.temp),
        windSpeed:data.wind.speed,
        location:data.name,
        icon: icon
      })
    }catch(error){
      setweatherData(false);
      console.error("Error in fetching weather data :",error);
    }
    
  }

  const inputRef = useRef()
  

  useEffect(()=>{
    search('Bangalore');
  },[])

  return (
    <div className="ContainerEle">
      <div className="searchBarContainer">
        <input ref={inputRef} type="text" placeholder="Search" className="searchbox"/>
        <img src={searchImage} alt="search" className="searchicon" onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData ? 
      <>
        <div clasName="bodyContainer">
        <img src={weatherData.icon} alt="cloud" className="weatherImage"/>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
      </div>
      <div className='footerSection'>
        <div className="col">
            <img src={humidityImage} alt="" />
            <div className="weather-data">
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={windImage} alt="" />
            <div className="weather-data">
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
      </div>
      </>: <></>}
    </div>
  )
}

export default Weather
