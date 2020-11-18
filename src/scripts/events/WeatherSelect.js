import { getWeather, useWeather } from "./WeatherProvider.js"

export const defaultWeather = () => {
    getWeather(36.174465, -86.767960).then(() => {
        const htmlTarget = document.querySelector(".weatherBox")
        const nashWeather = useWeather()
        const h4Target = document.querySelector(".h4Nashville")
        const todaysWeather = nashWeather.daily.slice(0, 1)
        const weatherHTML = todaysWeather.map(day => {
            const datept1 = day.dt * 1000
            const humanDate = new Date(datept1)
            const condensedDate = humanDate.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric"
            })
            const high = day.temp.max
            const low = day.temp.min
            const precip = day.weather[0].description
            const iconAddress = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            return `
                <div class="weatherDay">
                    <img src="${iconAddress}">
                    <p class="date">${condensedDate}</p>
                    <p class="highTemp">High: ${high}</p>
                    <p class="lowTemp">Low: ${low}</p>
                    <p class="rainCondition">Forecast: ${precip}</p>
                </div>
            `
        }).join("")
        h4Target.innerHTML = `<h4>Nashville Forecast</h4>`
        htmlTarget.innerHTML += weatherHTML
    })
}

export const weatherMaker = (lat, long, cityName) => {
    getWeather(lat, long).then(() => {
        const htmlTarget = document.querySelector(".weatherBox")
        const nashWeather = useWeather()
        const todaysWeather = nashWeather.daily.slice(0, 1)
        const weatherHTML = todaysWeather.map(day => {
            const datept1 = day.dt * 1000
            const humanDate = new Date(datept1)
            const condensedDate = humanDate.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric"
            })
            const high = day.temp.max
            const low = day.temp.min
            const precip = day.weather[0].description
            const iconAddress = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            return `
                <div class="weatherDay">
                    <img src="${iconAddress}">
                    <p class="date">${condensedDate}</p>
                    <p class="highTemp">High: ${high}</p>
                    <p class="lowTemp">Low: ${low}</p>
                    <p class="rainCondition">Forecast: ${precip}</p>
                </div>
            `
        }).join("")
        htmlTarget.innerHTML = `<h4>${cityName} Forecast</h4>` + weatherHTML
    })
}