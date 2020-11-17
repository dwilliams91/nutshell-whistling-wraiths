import { getFriends, useFriends } from "../friends/FriendDataProvider.js"
import { getUsers, useUsers } from "../user/UserDataProvider.js"
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
        .then(getFriends)
        .then(getUsers)
        .then(() => {
            // get all the users
            const allUsers=useUsers()
            // get all the articles
            allArticles = useArticles()
            // get all the friends
            const allfriends = useFriends()
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
eventHub.addEventListener("saveFriend", e => {
    ArticleList()
})
// 
eventHub.addEventListener("friendDeleted",e=>{
    ArticleList()
})