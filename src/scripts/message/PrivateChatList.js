import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { getMessages, editMessage, saveMessages, useMessages, deleteMessage } from "./MessageDataProvider.js"
import {messageHTMLCreator} from "./Message.js"
import { privateMessageHTMLCreator } from "./PrivateChat.js"
import { privateMessageForm } from "./PrivateChatForm.js"

const eventHub=document.querySelector(".container")

let selectedReceiever=0
eventHub.addEventListener("privateChatStarted",e=>{
    privateMessageList()
    selectedReceiever=e.detail.recieverId
})



export const privateMessageList=()=>{
    const contentTarget=document.querySelector(".friends")
    contentTarget.innerHTML=` <h2>Private Chat</h2> <article class="section privateMessage">
    <button id="backToFriends"> Back to Friends </button>
    <div class="privateMessage__form"></div>
    <div class="privateMessage__display"></div>
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
        return privateMessageHTMLCreator(individualMessage,relatedUser)
    }).join('')
    // puts everything in the target
    contentTarget.innerHTML=messagesHTML
}
// Friends list listens for this
eventHub.addEventListener("click",click=>{
    if (click.target.id==="backToFriends"){
        const RerenderFriends=new CustomEvent("RerenderFriends")
        eventHub.dispatchEvent(RerenderFriends)
    }

})

eventHub.addEventListener("click", click=>{
    // checks to see if the click happened on a delete button
    if (click.target.id.startsWith("privateMessageDelete--")){
        // splits the delete into two parts to get just the id
        const [prefix,id]=click.target.id.split("--")
        // sends that id to the delete function and then calls message list to rerender to the dom
        deleteMessage(id)
        .then(()=>{
            privateMessageList()
            privateMessageForm()
        })
        
    }
})
eventHub.addEventListener("click", click=>{
    // checks to see if the click happened on a edit button
    if (click.target.id.startsWith("privateMessageEdit--")){
        // splits the edit into two parts to get just the id
        const [prefix,id]=click.target.id.split("--")
        // creates a custom event that dispatches the id  of the message you want to edit. Listens for it in MessageForm around line 62
        const privateEditMessageEvent= new CustomEvent("privateEditMessage", {
            detail:{
                messageId: id
            }
        })
        eventHub.dispatchEvent(privateEditMessageEvent)  
    }
})


// listen for any changes to the local storage. When there is a change, rerun the privateMessageList then the PRivateMessageForm
window.addEventListener('storage', event => {
    getMessages().then(privateMessageList).then(privateMessageForm)
}
)