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
        </div>
        `
    }
    else{
        return `
        <div class = "article" id = "${articleObj.id}">
            
            <h4>${articleObj.title}</h4>
            <p>posted by: ${userObj.username}</p>
            <p class="synopsis">${articleObj.synopsis}</p>
            <a href="${articleObj.url}">${articleObj.url}</a>
            
        </div>
        `
    }
    
}