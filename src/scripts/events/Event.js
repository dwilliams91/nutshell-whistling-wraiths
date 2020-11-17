export const Event = (eventObj) => {
    return `
    <div class="event" id="${eventObj.id}">
        <h4>${eventObj.name}</h4>
        <p class="event__date">${eventObj.date}</p>
        <p class-"event__location">${eventObj.location}</p>
        <button id="deleteEvent__${eventObj.id}">Delete</button>
    </div>
    `
}

export const FirstEvent = (eventObj) => {
    return `
    <div class="first__event" id="${eventObj.id}">
        <h4>${eventObj.name}</h4>
        <p class="event__date">${eventObj.date}</p>
        <p class-"event__location">${eventObj.location}</p>
        <button id="deleteEvent__${eventObj.id}">Delete</button>
    </div>
    `
}

export const FriendEvent = (eventObj, user) => {
    return `
    <div class="friend__event friendStyle" id="friendEvent__${eventObj.id}">
        <h4>${eventObj.name}</h4>
        <p class="associated__friend">Event posted by: ${user.username}</p>
        <p class="event__date">${eventObj.date}</p>
        <p class="event__location">${eventObj.location}</p>
    </div>
    `
}