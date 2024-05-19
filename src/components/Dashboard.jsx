import React, { useEffect, useState } from "react"
import weatherbg from "./weather.module.css"
import 'simplebar-react/dist/simplebar.min.css';

import axios from "axios"
import HourlyGraph from "./HourlyGraph"
import SimpleBar from "simplebar-react"
import Map from "./Weathermap";
export default function Dashboard() {
    const arr = Array.from({ length: 10 })
    const [showLoader, setShowLoader] = useState(true)
    const [location, setLocation] = useState("")
    const [weatherData, setWeatherData] = useState()
    const [timeperiod, setTimePeriod] = useState()
    const [coords, setCoords] = useState()
    const [weatherbackground, setWeatherbackground] = useState()

    const fetchWeatherBylocation = async (city) => {
        setShowLoader(true)
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=6RU9V6F82VRFJY4NR9GZ5UWZP&unitGroup=metric`)
        console.log(response?.data)
        setWeatherData(response?.data)
        setShowLoader(false)
    }

    const handleLocationChange = (e) => {
        setLocation(e?.target?.value)
    }

    const fetchGeolocation = async () => {
        setShowLoader(true)
        const response = await fetch("http://ip-api.com/json");
        const data = await response.json();
        console.log(data, "data");

        if (data && data.country) {
            const countryName = data.country;
            setLocation(data?.city);
            console.log(data, ""); // Display or use the country name as needed
            fetchWeatherBylocation(data?.city)
            setCoords({lat: data?.lat, lon: data?.lon})
        }
        setShowLoader(false)
    };

    useEffect(() => {
        fetchGeolocation()
        setTimePeriod(getTimePeriod())
    }, [])


    function getTimePeriod() {
        const date = new Date();
        const hour = date.getHours();
      console.log(hour)
        if (hour > 5 && hour < 8) {
          return "Early_Morning";
        } else if (hour < 12) {
          return "Morning";
        } else if (hour < 16) {
          return "Afternoon";
        } else if (hour < 18) {
          return "Evening";
        } else if (hour >=18 ) {
          return "Night"; // Can be considered evening or night, adjust based on preference
        } else {
          return "Night";
        }
      }

      useEffect(()=>{
        if(weatherData?.currentConditions?.icon == "rain"){
            setWeatherbackground(weatherbg?.rain_weather)
        }else if(timeperiod == "Early_Morning"){
setWeatherbackground(weatherData?.earlymorning )
        }else if(timeperiod== "Evening"){
setWeatherbackground(weatherbg?.evening )
        }else if(timeperiod=="Night") {
            setWeatherbackground(weatherbg?.night )
        }else{
setWeatherbackground(weatherbg?.sunny_weather)
        }
      },[weatherbackground])
      



    return (
        <>
        {showLoader && <div className="absolute top-[50%] left-[50%] z-[9999]">
        <div className="loader"></div>

        </div>}
            <div className={`card  overflow-x-hidden !w-[100vw] min-h-[100vh] !h-auto ${showLoader? " blur-lg" :""}`} >
                <div className={`absolute !w-[100vw] min-h-[100vh] !h-full ${weatherbackground}`}></div>
                {/* Weather search by location input field */}
                <div className={`search_by_location relative mt-16 context mx-auto w-[75%] flex items-center`}>
                    <input className="form-control" value={location} onChange={(e) => handleLocationChange(e)} placeholder="Know your location weather" />
                    <button className="absolute right-4" onClick={() => fetchWeatherBylocation(location)}>🔍</button>
                </div>
                {/* basic weather info card */}
                <div className="container row ">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                            <div className="col-md-12">
                <div className=" bg-[rgba(250,250,250,0.5)] py-6 my-4 card  hover:drop-shadow-xl mix-blend-light">
                    <div className="flex items-center gap-4 justify-start">
                        <img className={`${weatherData?.currentConditions?.icon == "sun" ? weatherbg?.weather_icon_rotate : weatherbg?.weather_icon}`} src={weatherData?.currentConditions?.icon == "rain" ? "/precipitation.png" : `/icons/${weatherData?.currentConditions?.icon}.svg`} alt="Weather icons created by Freepik - Flaticon"></img>
                        <p className="text-4xl">{weatherData?.currentConditions?.temp} <sup className="text-xs top-[-1.5rem]">o</sup><span className="text-orange-500">C</span></p>
                        <div>
                            <p className="font-semibold text-sm">{weatherData?.currentConditions?.conditions}</p>
                            <p className="text-xs text-gray-800">{weatherData?.description}</p>
                        </div>
                    </div>
                    {/* additional info */}
                    <div className="flex items-center  justify-around gap-2 mt-4">
                        <div className="flex items-center  justify-start gap-1" >
                            <img src="/precipitation.png" className="w-14 h-15 rounded" />
                            <div>
                                <p>Precipitation</p>
                                <p>{weatherData?.currentConditions?.precip ? weatherData?.currentConditions?.precip : 0}%</p>
                            </div>
                        </div>
                        <div className="flex items-center  justify-start gap-1" >
                            <img src="/thermometer.png" className="w-14 h-15 rounded" />
                            <div>
                                <p>Humidity</p>
                                <p>{weatherData?.currentConditions?.humidity}</p>
                            </div>
                        </div>
                        <div className="flex items-center  justify-start gap-1" >
                            <img className={`${weatherbg?.windicon} w-14 h-15 rounded`} src="/windicon.png" />
                            <div>
                                <p>Wind</p>
                                <p>{weatherData?.currentConditions?.windspeed} MPH</p>
                            </div>
                        </div>
                        <div className="flex items-center  justify-start gap-1" >
                            <img className={`${weatherbg?.precip} w-14 h-15 rounded`} src="/sunraise.png" />
                            <div>
                                <p>Sunraise time</p>
                                <p>{weatherData?.currentConditions?.sunrise}</p>
                            </div>
                        </div>
                        <div className="flex items-center  justify-start gap-1" >
                            <img className={`${weatherbg?.precip} w-14 h-15 rounded`} src="/sunset.png" />
                            <div>
                                <p>Sunset time</p>
                                <p>{weatherData?.currentConditions?.sunset}</p>
                            </div>
                        </div>
                    </div>


                </div>
                </div>
=                </div>
                </div>

                <div className="container row">
                    {/* 14 days forcaste  */}
                    <div className="col-md-4">
                        <div className="card !bg-[rgba(250,250,250,.3)] mix-blend-hard-light  border-1 border-white ">
                            <h4 className="card-header font-semibold bg-[rgba(255,255,255,0.5)]">14 days weather forcast  </h4>
                            <SimpleBar className="max-h-[500px] overflow-y-auto">
                                {weatherData?.days?.map((val, ind) => (
                                    <div key={ind} className="flex items-center justify-between border p-2 border-b-1" >
                                        <p>{new Date(val?.datetime).toLocaleDateString("en-gb", { day: "2-digit", month: "short", year: "numeric" })}</p>


                                        <p className="flex items-center gap-1">
                                            <img className={`${val?.icon == "sun" ? weatherbg?.weather_icon_rotate : weatherbg?.weather_icon}`} 
                                            src={weatherData?.currentConditions?.icon == "rain" ? "/precipitation.png" : `/icons/${weatherData?.currentConditions?.icon}.svg`} alt="Weather icons created by Freepik - Flaticon"></img>
                                            {val?.temp} <sup className="text-xx">0</sup></p>
                                        {/* <span>{val?.tempmin} ------- {val?.tempmax}</span> */}
                                        <div className="flex items-center">
                                            <span className="mr-2">{val?.tempmin}</span>
                                            <div className="h-1 w-[50px] rounded-full bg-gradient-to-r from-lime-500 to-red-500">
                                                <div className={`w-${Math.min(Math.max((val?.tempmax ?? 0) - val?.tempmin ?? 0, 0), 100)}%`}></div>
                                            </div>
                                            <span className="ml-2">{val?.tempmax}</span>
                                        </div>
                                    </div>
                                ))}
                            </SimpleBar>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            {/* hourly forcaste */}
                            <div className="col-12">
                                <div className="card bg-[rgba(255,255,255,0.5)]">
                                    <p className="card-header text-xs">Rainy conditions from 9AM to 10AM, Partly cloudy conditions expected form 10 PM</p>
                                    <SimpleBar className="max-w-[100%] overflow-x-auto">
                                    <div className="card-body flex gap-4 items-center justify-between">
                                        
                                        {weatherData?.days[0]?.hours?.map((tem, ind) => (
                                            <div className="flex w-fit flex-col justify-between items-stretch px-2">
                                                <p>{tem?.datetime?.split(":")[0]}:{tem?.datetime?.split(":")[1]}</p>
                                                <div>
                                                <img className={`${tem?.icon == "sun" ? weatherbg?.weather_icon_rotate : weatherbg?.weather_icon}`} 
                                                src={weatherData?.currentConditions?.icon == "rain" ? "/precipitation.png" : `/icons/${weatherData?.currentConditions?.icon}.svg`} alt="Weather icons created by Freepik - Flaticon"></img>
                                                </div>
                                                <div>
                                                    {tem?.temp} <sup>0</sup>C
                                                </div>
                                            </div>
                                        ))}
                                         </div>
                                        </SimpleBar>
                                   
                                </div>
                            </div>
                            <div className="card bg-[rgba(255,255,255,0)] col-12">
                                <h4 className="text-lg text-white">Summary</h4>
                                <HourlyGraph weatherData={weatherData?.days} />
                            </div>
                            {/* <div className="col-12">
                                <Map coords={coords}/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}