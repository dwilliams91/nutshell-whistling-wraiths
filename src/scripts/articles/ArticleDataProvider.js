let articles = []
const eventHub = document.querySelector(".container")

export const getArticles = () => {
    return fetch("http://localhost:8088/articles")
    .then(response => response.json())
    .then(parsedData => articles = parsedData)
}

export const useArticles = () => articles.slice()

export const saveArticle = article => {
    return fetch('http://localhost:8088/articles', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })
    .then(getArticles)
}

export const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/articles/${articleId}`, {
        method: "DELETE"
    })
        .then(getArticles)
}
