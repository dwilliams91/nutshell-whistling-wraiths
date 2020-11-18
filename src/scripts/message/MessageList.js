import { deleteMessage, getMessages, useMessages } from "./MessageDataProvider.js"
import {messageHTMLCreator} from "./Message.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"

const eventhub=document.querySelector(".container")

// get the messages, and gets the users, then put them into the render function
export const messageList=()=>{
    getMessages()
    .then(getUsers)
    .then(()=>{
        const allMessages=useMessages()
        const allUsers=useUsers()
        // this takes out any private messages
        const publicMessages=allMessages.filter(singleMessage=>singleMessage.recieverId===undefined)
        console.log(publicMessages)
        render(publicMessages,allUsers)
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
// listen for a click
eventhub.addEventListener("click", click=>{
    // checks to see if the click happened on a delete button
    if (click.target.id.startsWith("messageDelete--")){
        // splits the delete into two parts to get just the id
        const [prefix,id]=click.target.id.split("--")
        // sends that id to the delete function and then calls message list to rerender to the dom
        deleteMessage(id)
        .then(()=>{
            messageList()
        })
        
    }
})
eventhub.addEventListener("click", click=>{
    // checks to see if the click happened on a edit button
    if (click.target.id.startsWith("messageEdit--")){
        // splits the edit into two parts to get just the id
        const [prefix,id]=click.target.id.split("--")
        // creates a custom event that dispatches the id  of the message you want to edit. Listens for it in MessageForm around line 62
        const editMessageEvent= new CustomEvent("editMessage", {
            detail:{
                messageId: id
            }
        })
        eventhub.dispatchEvent(editMessageEvent)  
    }
})
