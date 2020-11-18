export const privateMessageHTMLCreator=(messageObj,userObj)=>{
    const user=parseInt(sessionStorage.getItem("activeUser"))
    // if you are the user, then render a delete button so you can delete your own messages
    if (messageObj.userId===user){
        return`<p><strong id="addFriend--${userObj.id}--${userObj.username}">${userObj.username}</strong> ${messageObj.message} <button id="privateMessageDelete--${messageObj.id}">delete</button> <button id="privateMessageEdit--${messageObj.id}">Edit</button></p>`

    }
    else{
        return `<p><strong id="addFriend--${userObj.id}--${userObj.username}">${userObj.username}</strong> ${messageObj.message} </p>`
    }

}