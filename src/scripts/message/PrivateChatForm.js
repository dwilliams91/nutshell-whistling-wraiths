import { editMessage, saveMessages, useMessages } from "./MessageDataProvider.js"
import { messageList } from "./MessageList.js"

const eventhub = document.querySelector(".container")
// putting message form in its own module so I can reset the entry field after the user sends the message
export const privateMessageForm = () => {
    // render takes in an parameter. This parameter changes if a user wants to edit the message. 
    let defaultText = {
        message: "",
        id: "default"
    }
    render(defaultText)
}
// renders the form with the input value. The values will have a default if the person is typing a new message. 
// But will change if the user clicks on the edit button
const render = (text) => {
    const contentTarget = document.querySelector(".privateMessage__form")
    contentTarget.innerHTML = `<input type="text" placeholder="Type new post" id="privateMessage__form" value="${text.message}">
    <button id="messages__save"> post</button>
    <input type="hidden" name="${text.id}" id="messageId">`
}
eventhub.addEventListener("keyup", function(event) {
    
    if (event.keyCode === 13) {
    const checkingInput=document.querySelector("#messages__form").value
    if (checkingInput!==""){
     event.preventDefault();
     document.getElementById("messages__save").click();
    }
    }
  });



eventhub.addEventListener("click", click => {

    // on click check to see if the button was clicked
    if (click.target.id === "messages__save") {
        // gets the name value of the hidden field on line 21
        const HiddenId = document.querySelector("#messageId")
        // if the hidden field is set to default run the following logic.

        if (HiddenId.name === "default") {
            // if it was the button, take the text in the form and put it in the variable messages
            const messageText = document.querySelector("#privateMessage__form").value
            // find the active user who is sending this message
            const user = parseInt(sessionStorage.getItem("activeUser"))
            // create the json entry
            const newMessage = {
                userId: user,
                message: messageText
            }
            // send it to the json then refresh the list so it displays the new message and the form so it clears the entry
            saveMessages(newMessage)
                .then(messageList)
                .then(messageForm)
        }
        // if the hidden field is not default, then the user is editing a message. so it recreates the message object and sends it to the editMessage 
        else {
            const messageText = document.querySelector("#privateMessage__form").value
            // find the active user who is sending this message
            const user = parseInt(sessionStorage.getItem("activeUser"))
            // create the json entry with the same id as the entry the person is editing
            const editedMessage = {
                userId: user,
                message: messageText,
                id:HiddenId.name
            }
            // send it to the json then refresh the list so it displays the new message and the form so it clears the entry
            console.log(editedMessage)
            editMessage(editedMessage)
                .then(messageList)
                .then(messageForm)

        }
        
    }

})
// this listens for the edit button
eventhub.addEventListener("editMessage", e => {
    // this takes in the id of the message dispatched in the custom event in message list and finds the entry they want to edit
    const messageId = parseInt(e.detail.messageId)
    const allMessage = useMessages()
    const messageToEdit = allMessage.find(messageObj => messageObj.id === messageId)
    // this replaces the form text with the old text they want to edit
    render(messageToEdit)
})


// listens for a private chat

let selectedReceiever=0
export const dispatchPrivateMessage=()=>{
eventhub.addEventListener("privateChatStarted",e=>{
    console.log("you licked me")
    privateMessageForm()
    selectedReceiever=e.detail.recieverId
})
}