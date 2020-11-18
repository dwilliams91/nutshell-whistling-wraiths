import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { getMessages, editMessage, saveMessages, useMessages } from "./MessageDataProvider.js"
import {messageHTMLCreator} from "./Message.js"

const eventHub=document.querySelector(".container")

let selectedReceiever=0
eventHub.addEventListener("privateChatStarted",e=>{
    privateMessageList()
    selectedReceiever=e.detail.recieverId
})

export const privateMessageList=()=>{
    const contentTarget=document.querySelector(".friends")
    contentTarget.innerHTML=`<article class="section privateMessage">
    <h2>Private Chat</h2>
    <div class="privateMessage__display"></div>
    <div class="privateMessage__form"></div>
    <button id="backToFriends"> Back to Friends </button>
    </article>`

    const user=parseInt(sessionStorage.getItem("activeUser"))
    getMessages()
    .then(getUsers)
    .then(()=>{
        const allMessages=useMessages()
        const allUsers=useUsers()  
        

        // go through all the messages. Take each message. See if either the recieverId is the same as the receiver from the click event or the the user
        const bothMessages=allMessages.reverse().filter(singleMessage=>{
            // this checks to see if the recieverId matches the correct reciever
            if (singleMessage.recieverId===parseInt(selectedReceiever) && singleMessage.userId===user){
                return singleMessage
            } 
            // this checks to see if the reciever id matches the user
            else if (singleMessage.recieverId===user && singleMessage.userId===parseInt(selectedReceiever)){
                return singleMessage
            }

        })

        
        render(bothMessages,allUsers)
    })
}

const render=(messages,users)=>{
    // get the content target
    const contentTarget=document.querySelector(".privateMessage__display")
// go through all the messages. Use the reverse method so that the newest message always displays on the bottom instead of the top.
    const messagesHTML=messages.reverse().map(individualMessage=> {
        // for each message, find the matching user
        const relatedUser=users.find(user=>user.id===individualMessage.userId)
        // put the matching user and the message into the html creator in the message.js module
        return messageHTMLCreator(individualMessage,relatedUser)
    }).join('')
    // puts everything in the target
    contentTarget.innerHTML=messagesHTML
}