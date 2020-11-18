import { getFriends, useFriends } from "./FriendDataProvider.js"
import { useUsers, getUsers } from "../user/UserDataProvider.js";
import { FriendCardHTML } from "./Friend.js"
import "./FriendForm.js"

const eventHub = document.querySelector(".container")

let friendRelationshipArray = []
let userDataArray = []
let friendToAdd = {}

export const FriendList = () => {
    getFriends()
        .then(getUsers)
        .then(() => {
            friendRelationshipArray = useFriends()
            userDataArray = useUsers()
            // console.log("Currently logged in userId:", parseInt(sessionStorage.activeUser));
            render()
        })
}

const render = () => {
    const friendsContainer = document.querySelector(".friends")

    let friendDisplayHTML = ""
// debugger
        const matchingRelationships = friendRelationshipArray.filter(rel => parseInt(sessionStorage.activeUser) === rel.userId)
        // now convert the matching instances to some names
            // const matchedUserProfile = matchingRelationships.map(rel => {
                // const matchedUserProfile = 
                matchingRelationships.forEach(rel => {    
                
                const matchingUserObject = userDataArray.find(user => user.id === rel.following )
                // console.log(matchingRelationships);
                friendDisplayHTML += FriendCardHTML(matchingUserObject, matchingRelationships) 
                friendToAdd = matchingUserObject
                // above return not needed with forEach
        })

    let dropdownHTML = userDataArray.map((user) => {
        // i would like to add logic here to test if the person is already a user's friend
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
eventHub.addEventListener("friendStateChanged", FriendList)

eventHub.addEventListener("RerenderFriends",e=>{
    const contentTarget=document.querySelector(".privateMessage")
    contentTarget.innerHTML=`<article class="section friends">
    <h2>friends</h2>
</article>`
FriendList()

})
