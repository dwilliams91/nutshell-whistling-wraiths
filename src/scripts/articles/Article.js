export const Article = (articleObj) => {
    return `
    <div class = "article" id = "${articleObj.id}">
        <h4>${articleObj.title}</h4>
        <p class="synopsis">${articleObj.synopsis}</p>
        <a href="${articleObj.url}">${articleObj.url}</a>
        <button id="deleteArticle__${articleObj.id}">Delete</button>
    </div>
    `
}