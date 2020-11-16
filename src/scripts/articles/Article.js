export const Article = (articleObj) => {
    return `
    <div class = "article" id = "${articleObj.id}">
        <h3>${articleObj.title}</h3>
        <p class="synopsis">{$articleObj.synopsis}</p>
        <p> <a href="${articleObj.url}"></a></p>
        <button id="delete__article__${article.id}">Delete</button>
    </div>
    `
}