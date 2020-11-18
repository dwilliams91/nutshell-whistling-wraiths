let events = []
const eventHub = document.querySelector(".container")

export const getEvents = () => {
    return fetch("http://localhost:8088/events")
    .then(response => response.json())
    .then(parsedData => events = parsedData)
}

export const useEvents = () => events.slice()

export const saveEvent = event => {
    return fetch('http://localhost:8088/events', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    })
    .then(getEvents)
}

export const editEvent = (eventId, newObj) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newObj)
    })
        .then(getEvents)
}

export const deleteEvent = eventId => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE"
    })
        .then(getEvents)
}
