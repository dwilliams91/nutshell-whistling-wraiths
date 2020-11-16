// takes in the message and the user and creates the html for them
export const messageHTMLCreator=(messageObj,userObj)=>{
    const user=parseInt(sessionStorage.getItem("activeUser"))
    if (messageObj.userId===user){
        return`<p><strong>${userObj.username}</strong> ${messageObj.message} <button id="messageDelete--${messageObj.id}">delete</button></p>`

    }
    else{
        return `<p><strong>${userObj.username}</strong> ${messageObj.message} </p>`
    }
}