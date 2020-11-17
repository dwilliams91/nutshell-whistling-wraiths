import { saveFriend, deleteFriend } from "./FriendDataProvider.js"
import { FriendList } from "./FriendList.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "add_friend")  {
        const following = parseInt(document.getElementById("friend__dropdown").value)

        const saveFriend = new CustomEvent ("saveFriend", {
            detail: {
                following,
                userId: parseInt(sessionStorage.activeUser)
            }
        })
        console.log("add friend button clicked", following)
    eventHub.dispatchEvent(saveFriend)
    }
})

// when save friend button is clicked, pull the detail and pass it in to saveFriend function to post new friend object
eventHub.addEventListener("saveFriend", e => {
    saveFriend(e.detail)
    .then(FriendList)
})

// listen for deletion of friend button event, pull out friend id and cross-ref with friendRelationship array to delete approriate entry
eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("deleteFriendshipId--")) {
        const [prefix, id] = e.target.id.split("--")
        // separate out the friendshipId from the button element name, use 
        // that to target the frienship to delete from the JSON server by 
        // invoking deleteFriend
    console.log(id)
    
    deleteFriend(id)
    const friendDeleted=new CustomEvent("friendDeleted",{
        detail:{
            deleteFriend:id
        }
    })
    eventHub.dispatchEvent(friendDeleted)
    }
})

