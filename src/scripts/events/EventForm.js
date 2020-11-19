import { editEvent, saveEvent, useEvents } from "./EventDataProvider.js"
import { EventList } from "./EventList.js"
import { getGeocode, useGeocode } from "./GeocodeProvider.js"
import { weatherMaker } from "./WeatherSelect.js"

const eventHub = document.querySelector(".container")

//Renders event creation form HTML
export const EventForm = () => {
    const formTarget = document.querySelector(".formArea")

    formTarget.innerHTML = `
    <form action="">
    <fieldset>
        <label for="eventName">Event Name</label>
            <input type="text" name="eventName" id="eventName">
    </fieldset>
</form>
    <form action="">
    <fieldset>
        <label for="eventDate">Date</label>
            <input type="date" name="eventDate" id="eventDate">
    </fieldset>
</form>
<form action="">
    <fieldset>
        <label for="eventLocation">Location</label>
            <input type="text" name="eventLocation" text="Nashville, TN (Use this format for weather!)" id="eventLocation">
    </fieldset>
</form>
<button id="save__event">Save event</button>
    `
}

export const EventUpdateForm = (relatedEvent) => {
    const formTarget = document.querySelector(".formArea")

    formTarget.innerHTML = `
    <form action="">
    <fieldset>
        <label for="eventName">Event Name</label>
            <input type="text" name="eventName" id="eventName">
    </fieldset>
</form>
    <form action="">
    <fieldset>
        <label for="eventDate">Date</label>
            <input type="date" name="eventDate" id="eventDate">
    </fieldset>
</form>
<form action="">
    <fieldset>
        <label for="eventLocation">Location</label>
            <input type="text" name="eventLocation" text="Nashville, TN (Use this format for weather!)" id="eventLocation">
    </fieldset>
</form>
<button id="update__${relatedEvent}">update event</button>
    `
}

//Adds listener to eventHub to transmit custom event used for saving events
eventHub.addEventListener("click", e => {
    const formTarget = document.querySelector(".formArea")
    if (e.target.id === "save__event") {

        const date = document.getElementById("eventDate").value
        const name = document.getElementById("eventName").value
        const location = document.getElementById("eventLocation").value

        const savedEvent = new CustomEvent("saveEvent", {
            detail: {
                name,
                date,
                location,
                userId: parseInt(sessionStorage.getItem("activeUser"))
            }
        })

        eventHub.dispatchEvent(savedEvent)
        // Set the div back to empty when the save button is clicked
        formTarget.innerHTML = ""
    }

    //performs similar function to above but for updating and transmits additional eventId detail
    if (e.target.id.startsWith("update__")) {
        const date = document.getElementById("eventDate").value
        const name = document.getElementById("eventName").value
        const location = document.getElementById("eventLocation").value

        const eventId = e.target.id.split("__")[1]

        const updateEvent = new CustomEvent("updateEvent", {
            detail: {
                name,
                date,
                location,
                userId: parseInt(sessionStorage.getItem("activeUser")),
                eventId
            }
        })

        eventHub.dispatchEvent(updateEvent)
    }

})

//Listens for save event, saves the event, and updates the DOM.
eventHub.addEventListener("saveEvent", e => {
    saveEvent(e.detail)
        .then(EventList)
        .then(() => {
            const formTarget = document.querySelector(".event__form")
            formTarget.innerHTML = ""
        })

})

//Listens for update event, updates it, and updates the DOM.
eventHub.addEventListener("updateEvent", e => {
    editEvent(e.detail.eventId, e.detail)
        .then(EventList)
        .then(() => {

            const formTarget = document.querySelector(".event__form")
            formTarget.innerHTML = ""
        })
})

//Creats weather custom event and dispatches it to the DOM with necessary details
eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("showWeather")) {
        console.log(e.target.id)
        const eventTargetId = parseInt(e.target.id.split("__")[1])


        const currentEvent = useEvents().find(event => event.id === eventTargetId)

        const weatherUpdate = new CustomEvent("updateWeather", {
            detail: {
                location: currentEvent.location,
                date: currentEvent.date
            }
        })
        eventHub.dispatchEvent(weatherUpdate)
    }
})

//Uses info dispatched updateWeather event to call weatherMaker with all four parameters
eventHub.addEventListener("updateWeather", e => {
    //Gets City, ST formatted location and date from weather event
    const locationArray = e.detail.location.split(", ")
    const date = e.detail.date

    //Converts that location into geocode
    getGeocode(locationArray[0], locationArray[1])
        .then(() => {
            const coordinates = useGeocode()[0]
            console.log(coordinates)

            //Uses geocode object to get city name
            let cityName = ""
            if (coordinates.city) {
                cityName = coordinates.city
            } else {
                cityName = coordinates.name
            }
            const lat = coordinates.point.lat
            const long = coordinates.point.lng
            weatherMaker(lat, long, cityName, date)
        })
})