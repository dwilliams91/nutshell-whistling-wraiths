const eventHub = document.querySelector(".container")

export const Article = (articleObj,userObj) => {
    const user=parseInt(sessionStorage.getItem("activeUser"))
    if (articleObj.userId===user){
        return `
        <div class = "article" id = "${articleObj.id}">
            
            <h4>${articleObj.title}</h4>
            <p>posted by: ${userObj.username}</p>
            <p class="synopsis">${articleObj.synopsis}</p>
            <a href="${articleObj.url}">${articleObj.url}</a>
            <button id="deleteArticle__${articleObj.id}">Delete</button>
            <button id="editArticle--${articleObj.id}">Edit article</button>
        </div>
        `
    }
    else{
        return `
        <div class = "article friendStyle" id = "${articleObj.id}">
            
            <h4>${articleObj.title}</h4>
            <p>posted by: ${userObj.username}</p>
            <p class="synopsis">${articleObj.synopsis}</p>
            <a href="${articleObj.url}">${articleObj.url}</a>
            
        </div>
        `
    }
    
}

// If the edit article button is clicked, dispatch this event and include the article objects id in the detail. Dispatched to articleList.js
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editArticle")) {
        const [prefix, id] = event.target.id.split("--")
        const editArticle = new CustomEvent("articleEdit", {
            detail: {
                id: parseInt(id)
            }
        })
        eventHub.dispatchEvent(editArticle)
    }
})