import { getFriends, useFriends } from "./FriendDataProvider.js"
import { useUsers, getUsers } from "../user/UserDataProvider.js";
import { FriendCardHTML } from "./Friend.js"
import "./FriendForm.js"

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

    let dropdownHTML = userDataArray.map((user) => {

        if (user.id !== parseInt(sessionStorage.activeUser)) {
            return `<option value="${user.id}">${user.username}</option>`
        }}).join("")

        friendsContainer.innerHTML = ` 

        <h2>friends</h2>
        <div class="friends__form">
        <div class="friend__input">
        <select id="friend__dropdown">
        <option value="0">Choose a Friend to Add...</option>
        ${dropdownHTML}        
        </select>
        <button id="add_friend">add friend</button>
        </div>
        </div>
        <div class="friends__display">
            ${friendDisplayHTML}
        </div>
        `
}

eventHub.addEventListener("userAuthenticated", FriendList);
eventHub.addEventListener("friendAdded", FriendList);