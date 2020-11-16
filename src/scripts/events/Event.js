export const Event = (eventObj) => {
    return `
    <div class = "event" id = "${eventObj.id}">
        <h4>${eventObj.name}</h4>
        <p class="event__date">${eventObj.date}</p>
        <p class-"event__location">${eventObj.location}</p>
        <button id="deleteEvent__${eventObj.id}">Delete</button>
    </div>
    `
}