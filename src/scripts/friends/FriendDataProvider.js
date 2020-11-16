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
        console.log(friendsArray);
    })
}

export const useFriends = () => {
    return friendsArray.slice()
}

export const saveFriend = friend => {
    return fetch('http://localhost:8088/friends', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friend)
    })
    .then(getFriends)
}


// Story
// As a user, I should be able to add other users as friends so they can view my information

// As a user, I should be able to remove someone from my friends list

// Acceptance Criteria
// Given an active user sees a chat message from another user
// And wants to make that user a friend
// When the active user clicks on the other user's name in the chat history
// Then a message should be presented to the active user asking for verification of adding the other user to their friend list

// Given an active user wants to add another user to their friends list, but has no chat messages from that user
// When the active user performs a gesture on the Add a friend affordance
// Then the active user will be presented with an input field in which the other user's name can be entered

// Given an active user has entered in another user's name in order to add that user to their friend list
// When the active user performs a gesture on the Save affordance
// Then the active user's friends list should be updated with the added user

// Given an active wants to remove another user from their friends list
// When the active performs a gesture on a delete affordance in the friends list
// Then the the other user should be removed from their friends list

// Given another user has added the active user to their friends list
// When the active user is viewing the main view of the application
// Then the other user's news articles, and event list should appear in the current user's corresponding components
// And the other user's article and events should be styled with italicized font
// And the other user's article and events should be styled with a cornsilk background color
// And this should all happen at the moment the friend is added, without needing to refresh