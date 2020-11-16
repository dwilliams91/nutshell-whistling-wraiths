import { getFriends, useFriends } from "./FriendDataProvider.js"
import { useUsers, getUsers } from "../user/UserDataProvider.js";
import { FriendCardHTML }from "./Friend.js"

const eventHub = document.querySelector(".container")

let friendRelationshipArray = []
let userDataArray = []

export const FriendList = () => {
    getFriends()
        .then(getUsers)
        .then(() => {
            friendRelationshipArray = useFriends()
            userDataArray = useUsers()
            console.log(parseInt(sessionStorage.activeUser));
            render()
        })
}

const render = () => {
    const friendsContainer = document.querySelector(".friends")

    let friendDisplayHTML = ""
// debugger

    // userDataArray.map(
    //     (userObj) => {
            const matchingRelationships = friendRelationshipArray.filter(rel => parseInt(sessionStorage.activeUser) === rel.userId)
        // now convert the matching instances to some names
            const matchedUserProfile = matchingRelationships.map(rel => {
                // use a forEach() above 
                const matchingUserObject = userDataArray.find(user => user.id === rel.following )
                // console.log(matchingUserObject);
                friendDisplayHTML += FriendCardHTML(matchingUserObject) 
                return matchingUserObject
                // above return not needed with forEach
        })
        console.log("matched user profile", matchedUserProfile, "matching relationship object", matchingRelationships);
    // })

        friendsContainer.innerHTML = ` 

        <h2>friends</h2>
        <div class="friends__form">
        // Friend Input Form renders here
        </div>
        <div class="friends__display">
            ${friendDisplayHTML}
        </div>
        `
    
}

eventHub.addEventListener("userAuthenticated", FriendList);
eventHub.addEventListener("friendAdded", FriendList);