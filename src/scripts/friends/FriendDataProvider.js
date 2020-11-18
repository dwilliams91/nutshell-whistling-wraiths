/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the friends for different purposes.
 */
const eventHub = document.querySelector(".container")
/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
let friendsArray = []
// sortedByDate = journalArray.sort()
// return sortedByDate

export const getFriends = () => {
    return fetch("http://localhost:8088/friends") // Fetch from the API
    .then(response => response.json())  // Parse as JSON
    .then(updatedFriends => {
        friendsArray = updatedFriends
        // What should happen when we finally have the array?
        // console.log(friendsArray);
    })
}

export const useFriends = () => {
    return friendsArray.slice()
}

export const saveFriend = friend => {
    const user=parseInt(sessionStorage.getItem("activeUser"))
    const allfriends=useFriends()
    const onlyMyFriends=allfriends.filter(singlefriendObject=>singlefriendObject.userId===user)

    const previousFriend=onlyMyFriends.find(singlefriend => singlefriend.following===friend.following)
    console.log(previousFriend)
    if (previousFriend ===undefined){
        return fetch('http://localhost:8088/friends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friend)
    })
    .then(getFriends)
    .then(dispatchStateChangeEvent)

    }
    else{
        console.log("this is already a friend")
    }

    
    
}

const dispatchStateChangeEvent = () => {
    const friendStateChanged = new CustomEvent("friendStateChanged")
    eventHub.dispatchEvent(friendStateChanged)
}

export const deleteFriend = (id) => {
    return fetch(`http://localhost:8088/friends/${id}`, {
        method: "delete"
    })
    // get friends again, since they have been updated
    .then(getFriends)
    // run this function to dispatch to friendList.js
    .then(dispatchStateChangeEvent)    
}
