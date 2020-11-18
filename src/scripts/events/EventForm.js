import { editEvent, saveEvent } from "./EventDataProvider.js"
import { EventList } from "./EventList.js"

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
            <input type="text" name="eventLocation" id="eventLocation">
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
            <input type="text" name="eventLocation" id="eventLocation">
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
                id: e.target.id,
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
                id: e.target.id,
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
    
    if (e.id === "save__event") {
        saveEvent(e.detail)
            .then(EventList)
            .then(() => {
                const formTarget = document.querySelector(".event__form")
                formTarget.innerHTML = ""

            })
    } 
})

eventHub.addEventListener("updateEvent", e => {
    editEvent(e.detail.eventId, e.detail)
    .then(EventList)
    .then(() => {
        const formTarget = document.querySelector(".event__form")
                formTarget.innerHTML = ""
    })
})