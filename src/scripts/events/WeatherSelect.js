import { getWeather, useWeather } from "./WeatherProvider.js"

export const defaultWeather = () => {
    getWeather(36.174465, -86.767960).then(() => {
        const htmlTarget = document.querySelector(".weatherBox")
        const nashWeather = useWeather()
        console.log(nashWeather)
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

        htmlTarget.innerHTML = `<h4>Nasvhille Forecast</h4>` + weatherHTML
    })
}

export const weatherMaker = (lat, long, cityName, date) => {
    getWeather(lat, long).then(() => {
        let theDay = []
        const htmlTarget = document.querySelector(".weatherBox")
        const locationWeather = useWeather()
        const extendedForecast = locationWeather.daily.slice()

        const daySearcher = extendedForecast.map(day => {
            const datept1 = day.dt * 1000
            const humanDate = new Date(datept1)
            const condensedDate = humanDate.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric"
            })
            return condensedDate
        })

        console.log(daySearcher)
        let dateFound = false

        for (const day of daySearcher) {
            const correctDate = dateFixer(day)

            console.log(correctDate)


            if (correctDate === date) {
                dateFound = true
                const dayForWeather = extendedForecast.find(day => {
                    const datept1 = day.dt * 1000
                    const humanDate = new Date(datept1)
                    const condensedDate = humanDate.toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric"
                    })
                 
                    return dateFixer(condensedDate) === date
                })

                console.log(dayForWeather)
                console.log(correctDate)
                theDay[0] = dayForWeather
            }
        }

        if (dateFound === false) {
            window.alert(`You have chosen a date unreachable by the weatherAPI.  You will instead receive today's weather in that location`)
            theDay[0] = extendedForecast[0]
        }

        const weatherHTML = theDay.map(day => {
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

const dateFixer = (dateString) => {
            const splitDate = dateString.split("/")
            const yearString = splitDate[2]
            const monthString = splitDate[0]
            const dayString = splitDate[1]
            const correctDate = yearString + "-" + monthString + "-" + dayString
            return correctDate
}