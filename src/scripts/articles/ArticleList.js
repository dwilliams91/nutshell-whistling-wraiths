import { Article } from "./Article.js"
import { deleteArticle, getArticles, useArticles } from "./ArticleDataProvider.js"
import { ArticleForm } from "./ArticleForm.js"

const eventHub = document.querySelector(".container")


//Renders all articles to the DOM
export const ArticleList = () => {
    const displayTarget = document.querySelector(".articles__display")

    let allArticles = []
    const userIdNumber = parseInt(sessionStorage.getItem("activeUser"))

    getArticles()
        .then(() => {
            allArticles = useArticles()

            const currentArticles = allArticles.filter(articles => articles.userId === userIdNumber)

            displayTarget.innerHTML = currentArticles.map(article => {
                return Article(article)
            }).join("")
        })

}

//Adds listeners for deleting articles and displaying the adding form
eventHub.addEventListener("click", e => {
    if (e.target.id.startsWith("deleteArticle")) {
        const deleteArray = e.target.id.split("__")
        const deleteId = parseInt(deleteArray[1])

        deleteArticle(deleteId)
            .then(ArticleList)
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "article__save") {
        ArticleForm()
    }
})