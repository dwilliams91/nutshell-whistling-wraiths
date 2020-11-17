import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { getMessages, editMessage, saveMessages, useMessages } from "../message/MessageDataProvider.js"
import {messageHTMLCreator} from "../message/Message.js"

const eventHub=document.querySelector(".container")


eventHub.addEventListener("privateChatStarted",e=>{
    privateMessageList()
})

export const privateMessageList=()=>{
    console.log("hii")
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