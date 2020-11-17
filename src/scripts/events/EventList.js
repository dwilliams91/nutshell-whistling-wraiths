import { getFriends, useFriends } from "../friends/FriendDataProvider.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { Event, FirstEvent, FriendEvent } from "./Event.js"
import { deleteEvent, getEvents, useEvents } from "./EventDataProvider.js"
import { EventForm } from "./EventForm.js"

const eventHub = document.querySelector(".container")
const userIdNumber = parseInt(sessionStorage.getItem("activeUser"))
console.log(userIdNumber)

//Renders all events to the DOM, ensuring that soonest event is displayed first and has a special class
export const EventList = () => {
        
        render(userIdNumber)

}

const render = (userId) => {
    const displayTarget = document.querySelector(".events__display")

    getEvents().then(getUsers).then(getFriends).then( () => {
    
    //Gets all users and current user
    const allUsers = useUsers()
    const currentUser = allUsers.find(user => user.id === userId)
    
    //Gets all friendships and then an array of friendships involving the current user
    const friendRelationships = useFriends()
    const relevantRelationships = friendRelationships.filter(relationship => relationship.following === currentUser.id)

    //gets all events and then gets all events associated with currents users' friends
    const allEvents = useEvents()
    const friendEvents =  relevantRelationships.map(relationship => {
        return allEvents.filter(events => events.userId === relationship.userId)
    })
    

    // Filters all events down to only events for the current user
    const currentUserEvents = allEvents.filter(events => events.userId === userIdNumber)

    // Sorts events by date, oldest to newest
    const eventsByDate = currentUserEvents.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
    })
    // Returns the chronologically soonest future vent
    const nearestEvent = eventsByDate.find(event => Date.now() < Date.parse(event.date))

    const indexToRemove = eventsByDate.indexOf(nearestEvent)

    eventsByDate.splice(indexToRemove, 1)


    // Creates 2 strings, one for the nearestEvent and one for all other events and adds them together and appends to the DOM
    let displayString = ""

    if (nearestEvent !== undefined && eventsByDate.length >= 1) {
        const firstEventString = FirstEvent(nearestEvent)
        const otherEventsString = eventsByDate.map(event => {
            return Event(event)
        }).join("")

        displayString = firstEventString + otherEventsString
    } else {
        displayString = currentUserEvents.map(event => Event(event)).join("")
    }
    
    let allfriendEvents = []
    for (const innerArray of friendEvents) {
        for (const item of innerArray) {
            allfriendEvents.push(item)
        }
    }

    console.log(allfriendEvents)

    const friendEventsString = allfriendEvents.map(event => {
        const relatedUser=allUsers.find(user => user.id === event.userId)
        console.log(relatedUser)
        return FriendEvent(event, relatedUser)
    }).join("")

    console.log(friendEventsString)
    
    displayString += friendEventsString  

    displayTarget.innerHTML = displayString
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

// re-renders when you add a friend
eventHub.addEventListener("saveFriend", e => {
    EventList()
})
// 
eventHub.addEventListener("friendDeleted",e=>{
    EventList()
})