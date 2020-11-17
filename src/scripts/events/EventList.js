import { useFriends } from "../friends/FriendDataProvider.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { Event, FirstEvent, FriendEvent } from "./Event.js"
import { deleteEvent, getEvents, useEvents } from "./EventDataProvider.js"
import { EventForm } from "./EventForm.js"

const eventHub = document.querySelector(".container")
const userIdNumber = parseInt(sessionStorage.getItem("activeUser"))
console.log(userIdNumber)

//Renders all events to the DOM, ensuring that soonest event is displayed first and has a special class
export const EventList = () => {
    const displayTarget = document.querySelector(".events__display")

    let allEvents = []
    

    getEvents()
        .then(() => {
            allEvents = useEvents()

            // Filters all events down to only events for the current user
            const currentEvents = allEvents.filter(events => events.userId === userIdNumber)

            // Sorts events by date, oldest to newest
            const eventsByDate = currentEvents.slice().sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            })
            // Returns the chronologically soonest future vent
            const nearestEvent = eventsByDate.find(event => Date.now() < Date.parse(event.date))

            const indexToRemove = eventsByDate.indexOf(nearestEvent)

            eventsByDate.splice(indexToRemove, 1)


            // Creates 2 strings, one for the nearestEvent and one for all other events and adds them together and appends to the DOM
            if (nearestEvent !== undefined && eventsByDate.length >= 1) {
                const firstEventString = FirstEvent(nearestEvent)
                const otherEventsString = eventsByDate.map(event => {
                    return Event(event)
                }).join("")

                displayTarget.innerHTML = firstEventString + otherEventsString
            } else {
                displayTarget.innerHTML = currentEvents.map(event => Event(event)).join("")
            }
            renderFriendEvents(userIdNumber)
        })


}

const renderFriendEvents = (userId) => {
    getUsers().then( () => {
    const allUsers = useUsers()
    const currentUser = allUsers.find(user => user.id === userId)
    console.log(currentUser)
    const friendRelationships = useFriends()
    const relevantRelationships = friendRelationships.filter(relationship => relationship.following === currentUser.id)

    const allEvents = useEvents()
    const friendEvents =  relevantRelationships.map(relationship => {
        return allEvents.filter(events => events.userId === relationship.following)
    })
    console.log(friendEvents)
    console.log(userIdNumber)
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

eventHub.addEventListener("saveFriend", e => {

})