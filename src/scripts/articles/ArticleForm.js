import { saveArticle } from "./ArticleDataProvider.js"
import { ArticleList } from "./ArticleList.js"

const eventHub = document.querySelector(".container")

//Renders article creation form HTML
export const ArticleForm = () => {
    const formTarget = document.querySelector(".formArea")

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

export const editArticleForm = (articleObj) => {
    const formTarget = document.querySelector(".formArea")

    formTarget.innerHTML = `
    <form action="">
    <fieldset>
        <label for="editedArticleTitle">Title</label>
            <input type="text" name="editedArticleTitle" id="editedArticleTitle" value="${articleObj.title}">
    </fieldset>
</form>
    <form action="">
    <fieldset>
        <label for="editedArticleSynopsis">Synopsis</label>
            <input type="text" name="editedArticleSynopsis" id="editedArticleSynopsis" value="${articleObj.synopsis}">
    </fieldset>
</form>
<form action="">
    <fieldset>
        <label for="editedArticleUrl">URL</label>
            <input type="text" name="editedArticleUrl" id="editedArticleUrl" value="${articleObj.url}">
    </fieldset>
</form>
<button id="edit--${articleObj.id}">Save Edited Article</button>
    `
}

//Adds listener to eventHub to transmit custom event used for saving articles
eventHub.addEventListener("click", e => {
    const formTarget = document.querySelector(".formArea")
    if (e.target.id === "save__article") {

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
        // set the container back to emtpy
        formTarget.innerHTML = ""

    }
})

eventHub.addEventListener("saveArticle", e => {
    saveArticle(e.detail)
    .then(ArticleList)
})

// When someone clicks save edited article button, pass along the new values. Dispatched to ArticleList.js
eventHub.addEventListener("click", event => {
    const formTarget = document.querySelector(".formArea")
    if (event.target.id.startsWith("edit--")) {
        const [prefix, id] = event.target.id.split("--")
        const synopsis = document.getElementById("editedArticleSynopsis").value
        const title = document.getElementById("editedArticleTitle").value
        const url = document.querySelector("#editedArticleUrl").value
        console.log("the id is: ", id)
        const editedArticle = new CustomEvent("articleEdited", {
            detail: {
                id: parseInt(id),
                editedArticle: {
                    title,
                    synopsis,
                    url,
                    timestamp: Date.now(),
                    userId: parseInt(sessionStorage.getItem("activeUser"))
                }
            }
        })
        eventHub.dispatchEvent(editedArticle)
        // Set form area back to empty once button is clicked
        formTarget.innerHTML = ""
    }
})