import { getMessages, useMessages } from "./MessageDataProvider.js"
import {messageHTMLCreator} from "./Message.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"

const eventhub=document.querySelector(".container")

// get the messages, and gets the users, then put them into the render function
export const messageList=()=>{
    getMessages()
    .then(getUsers)
    .then(()=>{
        const allMessage=useMessages()
        const allUsers=useUsers()
        render(allMessage,allUsers)
    })
}

const render=(messages,users)=>{
    // get the content target
    const contentTarget=document.querySelector(".messages__display")
// go through all the messages
    const messagesHTML=messages.map(individualMessage=> {
        // for each message, find the matching user
        const relatedUser=users.find(user=>user.id===individualMessage.userId)
        // put the matching user and the message into the html creator in the message.js module
        return messageHTMLCreator(individualMessage,relatedUser)
    }).join('')
    // puts everything in the target
    contentTarget.innerHTML=messagesHTML

}

