// takes in the message and the user and creates the html

export const messageHTMLCreator=(messageObj,userObj)=>{
    const user=parseInt(sessionStorage.getItem("activeUser"))
    // if you are the user, then render a delete button so you can delete your own messages
    if (messageObj.userId===user){
        return`<p><strong>${userObj.username}</strong> ${messageObj.message} <button id="messageDelete--${messageObj.id}">delete</button> <button id="messageEdit--${messageObj.id}">Edit</button></p>`

    }
    else{
        return `<p><strong>${userObj.username}</strong> ${messageObj.message} </p>`
    }
}