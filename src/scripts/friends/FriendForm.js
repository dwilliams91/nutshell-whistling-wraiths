import { saveFriend } from "./FriendDataProvider.js"
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
    if (e.target.id.startsWith("deleteFriend--")) {
        const [prefix, id] = e.target.id.split("--")
    console.log(id)
    }
})