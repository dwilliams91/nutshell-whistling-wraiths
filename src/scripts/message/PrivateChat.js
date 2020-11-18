export const privateMessageHTMLCreator=(messageObj,userObj)=>{
    const user=parseInt(sessionStorage.getItem("activeUser"))
    // if you are the user, then render a delete button so you can delete your own messages
    if (messageObj.userId===user){
            return`<div>
            <p class= "myMessages" id="myMessages--${messageObj.id}">  ${messageObj.message} </p>
            <div class="displayButtons--${messageObj.id} displayButtons">
            <button id="privateMessageDelete--${messageObj.id}">delete</button> <button id="privateMessageEdit--${messageObj.id}">Edit</button>
            </div>
            </div>`
    }
    else{
        return `<p class="otherMessages"><strong id="addFriend--${userObj.id}--${userObj.username}">${userObj.username}</strong> ${messageObj.message} </p>`
    }

}



const eventHub=document.querySelector(".container")

eventHub.addEventListener("click",click=>{
    if (click.target.id.startsWith("myMessages")){
        let [prefix,id]=click.target.id.split("--")
        console.log(id)
        myFunction(id)    
    }

})

function myFunction(id) {
    let x = document.querySelector(`.displayButtons--${id}`);
    console.log(x.style.display)
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }