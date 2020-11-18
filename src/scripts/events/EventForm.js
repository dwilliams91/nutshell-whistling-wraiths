import { editEvent, saveEvent } from "./EventDataProvider.js"
import { EventList } from "./EventList.js"
import { getGeocode, useGeocode } from "./GeocodeProvider.js"

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


eventHub.addEventListener("saveEvent", e => {
    const weatherUpdate = new CustomEvent("updateWeather", {
        detail: {
            locationString: document.getElementById("eventLocation").value
        }
    })
    eventHub.dispatchEvent(weatherUpdate)
            saveEvent(e.detail)
            .then(EventList)
            .then(() => {

                

                const formTarget = document.querySelector(".event__form")
                formTarget.innerHTML = ""
            })
    
})

eventHub.addEventListener("updateEvent", e => {
    editEvent(e.detail.eventId, e.detail)
        .then(EventList)
        .then(() => {

            const weatherUpdate = new CustomEvent("updateWeather", {
                detail: {
                    locationString: document.getElementById("eventLocation").value
                }
            })
            eventHub.dispatchEvent(weatherUpdate)

            const formTarget = document.querySelector(".event__form")
            formTarget.innerHTML = ""
        })
})

eventHub.addEventListener("updateWeather", e => {
    console.log(e.detail.locationString)
    const locationArray = e.detail.locationString.split(", ")
    getGeocode(locationArray[0], locationArray[1])
    .then( () => {
        const coordinates = useGeocode()
        console.log(coordinates)
    })
})