import { keys } from '../Settings.js'

let weather = {}

export const useWeather = () => weather

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