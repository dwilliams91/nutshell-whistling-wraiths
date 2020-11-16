import { getUsers,useUsers } from "../user/UserDataProvider.js"
import { saveMessages } from "./MessageDataProvider.js"
import { messageList } from "./MessageList.js"

const eventhub=document.querySelector(".container")
// putting message form in its own module so I can reset the entry field after the user sends the message
export const messageForm=()=>{
render()
}
const render=()=>{
    const contentTarget=document.querySelector(".messages__form")
    contentTarget.innerHTML=`<input type="text" id="messages__form">
    <button id="messages__save"> post</button>`
}

eventhub.addEventListener("click",click=>{
    // on click check to see if the button was clicked
    if (click.target.id==="messages__save"){
        // if it was the button, take the text in the form and put it in the variable messages
        const messageText=document.querySelector("#messages__form").value
        // find the active user who is sending this message
        const user=parseInt(sessionStorage.getItem("activeUser"))
        // create the json entry
        const newMessage={
            userId:user,
            message:messageText
        }
        // send it to the json then refresh the list so it displays the new message and the form so it clears the entry
        saveMessages(newMessage)
        .then(messageList)
        .then(messageForm)

        
    }
})