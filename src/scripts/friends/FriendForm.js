import { saveFriend, deleteFriend } from "./FriendDataProvider.js"
import { FriendList } from "./FriendList.js"
import { messageList } from "../message/MessageList.js"
import { Nutshell } from "../Nutshell.js"
import { privateMessageList } from "../message/PrivateChatList.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    // debugger
    
    if (clickEvent.target.id === "add_friend" && following !==0)  {
        const following = parseInt(document.getElementById("friend__dropdown").value)

        const friendSaved = new CustomEvent ("friendSaved", {
            detail: {
                following,
                userId: parseInt(sessionStorage.activeUser)
            }
        })
        // console.log("add friend button clicked", following)
    eventHub.dispatchEvent(friendSaved)
    }
})

// when save friend button is clicked, pull the detail and pass it in to saveFriend function to post new friend object
eventHub.addEventListener("friendSaved", e => {
    saveFriend(e.detail)
    .then(FriendList)
})

// below is the functionality for being able to click on a name from the message area and add them as a friend
eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("addFriend--")) {
        const [prefix, id, friendName] = e.target.id.split("--")

        const friendDataFromMessage = new CustomEvent ("addFriendPrompt", {
            detail: {
                friendName,
                userId: id
            }
        })
        console.log("add friend from Message clicked", friendDataFromMessage.detail)
        eventHub.dispatchEvent(friendDataFromMessage)
    }
})

// first we want to define a function which will render a prompt on the DOM
const addFriendPrompt = (friendName, friendUserId) => {
    const contentTarget = document.querySelector("#addFriendTarget")
    contentTarget.innerHTML = `
        <p>Would you like to add ${friendName} as a friend?</p>
        <button id="yesAdd--${friendUserId}">Yes</button><button id="noThanks">No Thanks</option>
        `
}

// now we listen for a name to be clicked on and give the user a prompt by invoking addFriendPrompt
eventHub.addEventListener("addFriendPrompt", e => {
    console.log("add friend confirmation prompt")
    addFriendPrompt(e.detail.friendName, e.detail.userId)
})


// now we listen for that Yes button to be clicked, or perhaps there's a No
// button option as well. Both buttons render the Target back to "", but Yes is listened for by the event listener on line 32
eventHub.addEventListener("click", e => {
    let contentTarget = document.querySelector("#addFriendTarget");
    
    if (e.target.id.startsWith("yesAdd--")) {
    const [prefix, uniqueId] = e.target.id.split("--")
    // saveFriend({following: parseInt(uniqueId), userId: parseInt(sessionStorage.activeUser)})
        contentTarget.innerHTML = ""
        const addFriendFromMessage = new CustomEvent ("friendSaved", {
            detail: {
                following: parseInt(uniqueId),
                userId: parseInt(sessionStorage.activeUser)
            }
        })
        console.log("add friend from Message confirmed", addFriendFromMessage.detail)
        eventHub.dispatchEvent(addFriendFromMessage)
    }
    // this is the no button functionality
    else if (e.target.id === "noThanks") {
        contentTarget.innerHTML = "" 
    }
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
// send out an event listener to privateChatList
eventHub.addEventListener("click",click=>{
    if(click.target.id.startsWith("chatFriendshipId--")){
        const [prefix, id]= click.target.id.split("--")
        const privateChat= new CustomEvent("privateChatStarted",{
            detail:{
                recieverId:id
            }
        })
        // console.log(privateChat)
        eventHub.dispatchEvent(privateChat)

    }
})

