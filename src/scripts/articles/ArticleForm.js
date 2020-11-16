import { saveArticle } from "./ArticleDataProvider.js"
import { ArticleList } from "./ArticleList.js"

const eventHub = document.querySelector(".container")

//Renders article creation form HTML
export const ArticleForm = () => {
    const formTarget = document.querySelector(".article__form")

    formTarget.innerHTML = `
    <form action="">
    <fieldset>
        <label for="articleTitle">Title</label>
            <input type="text" name="articleTitle" id="articleTitle">
    </fieldset>
</form>
    <form action="">
    <fieldset>
        <label for="articleSynopsis">Synopsis</label>
            <input type="text" name="articleSynopsis" id="articleSynopsis">
    </fieldset>
</form>
<form action="">
    <fieldset>
        <label for="articleURL">URL</label>
            <input type="text" name="articleURL" id="articleURL">
    </fieldset>
</form>
<button id="save__article">Save Article</button>
    `
}

//Adds listener to eventHub to transmit custom event used for saving articles
eventHub.addEventListener("click", e => {
    if (e.target.id === "save__article") {

        console.log("hi")

        const synopsis = document.getElementById("articleSynopsis").value
        const title = document.getElementById("articleTitle").value
        const url = document.getElementById("articleURL").value

        const saveArticle = new CustomEvent("saveArticle", {
            detail: {
                title,
                synopsis,
                url,
                timestamp: Date.now(),
                userId: parseInt(sessionStorage.getItem("activeUser"))
            }
        })

        eventHub.dispatchEvent(saveArticle)
    }
})

eventHub.addEventListener("saveArticle", e => {
    saveArticle(e.detail)
    .then(ArticleList)
})