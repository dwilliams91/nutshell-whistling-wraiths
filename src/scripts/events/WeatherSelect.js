import { getWeather, useWeather } from "./WeatherProvider.js"

//displays default weather on page load for Nashville, TN
export const defaultWeather = () => {
    getWeather(36.174465, -86.767960).then(() => {
        const htmlTarget = document.querySelector(".weatherBox")
        const nashWeather = useWeather()
        console.log(nashWeather)
        const todaysWeather = nashWeather.daily.slice(0, 1)
        const weatherHTML = todaysWeather.map(day => {
            const condensedDate = humanifyDateFromWeather(day)
            const high = day.temp.max
            const low = day.temp.min
            const precip = day.weather[0].description
            const iconAddress = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            return `
                <div class="weatherDay">
                    <img class="icon" src="${iconAddress}">
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

//Takes lattitude, longitude, city name, and date from an event object and displays relevant weather to the DOM
export const weatherMaker = (lat, long, cityName, date) => {
    getWeather(lat, long).then(() => {
        let theDay = []
        const htmlTarget = document.querySelector(".weatherBox")
        const locationWeather = useWeather()
        const extendedForecast = locationWeather.daily.slice()

        //Gets array of all available days from the API with only their human readable dates
        const daySearcher = extendedForecast.map(day => {
            return humanifyDateFromWeather(day)
        })

        let dateFound = false

        //Loops through the above array and checks whether any of them match the date for the event user requested weather for
        for (const day of daySearcher) {
    
            const correctDate = dateFixer(day)

            //checks if the date in the loop is identical to the one in the from the event selected, and if so assigns it as the day to display weather for.
            if (correctDate === date) {
                dateFound = true
                const dayForWeather = extendedForecast.find(day => {
                    const condensedDate = humanifyDateFromWeather(day)
                
                    return dateFixer(condensedDate) === date
                })

                console.log(dayForWeather)
                console.log(correctDate)
                theDay[0] = dayForWeather
            }
        }

        //Sets window alert if user requests whether from date API cannot reach.  Assigns today's date as the day to have its weather displayed instead.
        if (dateFound === false) {
            window.alert(`You have chosen a date unreachable by the weatherAPI.  You will instead receive today's weather in that location`)
            theDay[0] = extendedForecast[0]
        }

        //Constructs whether HTML and assigns to the DOM
        const weatherHTML = theDay.map(day => {
            const date = humanifyDateFromWeather(day)

            const high = day.temp.max
            const low = day.temp.min
            const precip = day.weather[0].description
            const iconAddress = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            return `
                <div class="weatherDay">
                    <img class="icon" src="${iconAddress}">
                    <p class="date">${date}</p>
                    <p class="highTemp">High: ${high}</p>
                    <p class="lowTemp">Low: ${low}</p>
                    <p class="rainCondition">Forecast: ${precip}</p>
                </div>
            `
        }).join("")

        htmlTarget.innerHTML = `<h4>${cityName} Forecast</h4>` + weatherHTML
    })
}

//Takes day object from weather API and makes the timestamp human readable
const humanifyDateFromWeather = dateObj => {
    const datept1 = dateObj.dt * 1000
    const humanDate = new Date(datept1)
    const condensedDate = humanDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
    })
    return condensedDate
}

//Takes date as displayed on the DOM and formats it like humanifyDateFromWeather for comparison
const dateFixer = (dateString) => {
            const splitDate = dateString.split("/")
            const yearString = splitDate[2]
            const monthString = splitDate[0]
            const dayString = splitDate[1]
            const correctDate = yearString + "-" + monthString + "-" + dayString
            return correctDate
}