
export const FriendCardHTML = (matchedUserObject, friendshipArray) => {
    
    // we are passing along the friendshipId so that we can include it with a click event when 
    // we later want to delete a specific friendship instance
    const friendshipId = friendshipArray.find(
        friendshipUnit => friendshipUnit.following === matchedUserObject.id)
        // console.log("friendshipId: ", friendshipId.id);
    return `
    <h3>Friend's name: ${matchedUserObject.username}</h3>
    <button id="deleteFriendshipId--${friendshipId.id}">Remove Friend</button> 
    <button id="chatFriendshipId--${friendshipId.following}">start chat</button> 
    `
}
