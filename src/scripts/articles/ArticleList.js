import { getFriends, useFriends } from "../friends/FriendDataProvider.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { Article } from "./Article.js"
import { deleteArticle, getArticles, useArticles, updateArticle } from "./ArticleDataProvider.js"
import { ArticleForm, editArticleForm } from "./ArticleForm.js"

const eventHub = document.querySelector(".container")
let allUsers = []
let allArticles = []
let allfriends = []

//Renders all articles to the DOM
export const ArticleList = () => {
    const displayTarget = document.querySelector(".articles__display")

    const userIdNumber = parseInt(sessionStorage.getItem("activeUser"))

    getArticles()
        .then(getFriends)
        .then(getUsers)
        .then(() => {
            // get all the users
            allUsers=useUsers()
            // get all the articles
            allArticles = useArticles()
            // get all the friends
            allfriends = useFriends()
            // find just the friends of the login user
            const myfriends = allfriends.filter(friends => friends.userId === userIdNumber)
            // go through each of my friends, for each of them check to see if they have any articles
            const myFriendsArticles = myfriends.map(friend => {
                let matchingArticleforSingleFriends = allArticles.filter(article => article.userId === friend.following)
                return matchingArticleforSingleFriends
            })
            // find all of my articles
            let myArticles = allArticles.filter(articles => articles.userId === userIdNumber)
            // put my articles into an array of all the articles to display
            let allArticlesToDisplay = myArticles
            // all of my friends articles are not in a flat array, so they need this logic to push each single article object 
            // into the array
            myFriendsArticles.map(article => {
                for (let i = 0; i < article.length; i++) {
                    myArticles.push(article[i])
                }
            })
            // 
            // console.log("A single array of all the articles", allArticlesToDisplay)
            // this renders each article to the dom
            
            
            displayTarget.innerHTML = allArticlesToDisplay.map(article => {
                const relatedUser=allUsers.find(user=>user.id===article.userId)
                return Article(article,relatedUser)
            }).join("")
        })
}

// broadcast from ArticleDataProvider.js, after a new article has been updated, this will make articleList rerun so that the new article also renders to the DOM
eventHub.addEventListener("articleStateChanged", ArticleList)

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
// re-renders when you add a friend
eventHub.addEventListener("friendSaved", e => {
    ArticleList()
})
// 
eventHub.addEventListener("friendDeleted",e=>{
    ArticleList()
})

// Broadcast from Article.js
eventHub.addEventListener("articleEdit", event => {
        const article = allArticles.find(article => article.id === event.detail.id)
        editArticleForm(article)
})

// Broadcast from ArticleForm.js
eventHub.addEventListener("articleEdited", event => {
    // debugger
    console.log("the id is ", event.detail.id)
    const article = allArticles.find(article => article.id === event.detail.id)
    const editedArticle = {
        id: article.id,
        userId: event.detail.editedArticle.userId,
        title: event.detail.editedArticle.title,
        synopsis: event.detail.editedArticle.synopsis,
        timestamp: event.detail.editedArticle.timestamp,
        url: event.detail.editedArticle.url
    }
    updateArticle(editedArticle)
})


