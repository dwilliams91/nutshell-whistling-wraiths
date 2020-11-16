import { Event } from "./Event.js"
import { deleteEvent, getEvents, useEvents } from "./EventDataProvider.js"
import { EventForm } from "./EventForm.js"

const eventHub = document.querySelector(".container")


//Renders all events to the DOM
export const EventList = () => {
    const displayTarget = document.querySelector(".events__display")

    let allEvents = []
    const userIdNumber = parseInt(sessionStorage.getItem("activeUser"))

    getEvents()
        .then(() => {
            allEvents = useEvents()

            const currentEvents = allEvents.filter(events => events.userId === userIdNumber)

            displayTarget.innerHTML = currentEvents.map(event => {
                return Event(event)
            }).join("")
        })

}

eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("deleteEvent")) {
        const deleteArray = e.target.id.split("__")
        const deleteId = parseInt(deleteArray[1])

        deleteEvent(deleteId)
            .then(EventList)
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "event__save") {
        EventForm()
    }
})