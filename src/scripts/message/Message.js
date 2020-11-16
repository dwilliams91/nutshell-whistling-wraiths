// takes in the message and the user and creates the html for them
export const messageHTMLCreator=(messageObj,userObj)=>{
    return `<p><strong>${userObj.username}</strong> ${messageObj.message}</p>`

}