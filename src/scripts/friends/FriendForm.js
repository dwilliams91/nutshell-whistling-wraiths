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

eventHub.addEventListener("saveFriend", e => {
    saveFriend(e.detail)
    .then(FriendList)
})