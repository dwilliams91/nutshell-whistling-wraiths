import { keys } from '../Settings.js'

let weather = {}

export const useWeather = () => weather

//Gets weather for next 8 days, stores that in the weather object

export const getWeather=(lat, lon)=>
{
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=${keys.weatherKey}`, {
        method: "GET"
    })
    .then(response=>response.json())
    .then(parsedWeather=>{
        Object.assign(weather,parsedWeather)
    })
}