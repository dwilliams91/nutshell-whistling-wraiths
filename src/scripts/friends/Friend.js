
export const FriendCardHTML = (matchedUserObject) => {
    // debugger
    return `
    <h3>Friend's name: ${matchedUserObject.username}</h3>
    <button id="delete__friend--${matchedUserObject.id}">Remove Friend</button> 
    `
}