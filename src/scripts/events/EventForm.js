import { saveEvent } from "./EventDataProvider.js"
import { EventList } from "./EventList.js"

const eventHub = document.querySelector(".container")

//Renders event creation form HTML
export const EventForm = () => {
    const formTarget = document.querySelector(".event__form")

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

//Adds listener to eventHub to transmit custom event used for saving events
eventHub.addEventListener("click", e => {
    if (e.target.id === "save__event") {

        const date = document.getElementById("eventDate").value
        const name = document.getElementById("eventName").value
        const location = document.getElementById("eventLocation").value

        const saveEvent = new CustomEvent("saveEvent", {
            detail: {
                name,
                date,
                location,
                userId: parseInt(sessionStorage.getItem("activeUser"))
            }
        })

        eventHub.dispatchEvent(saveEvent)
    }
})

eventHub.addEventListener("saveEvent", e => {
    saveEvent(e.detail)
    .then(EventList)
})