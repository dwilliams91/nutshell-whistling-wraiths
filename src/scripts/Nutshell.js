import { taskList } from "./task/taskList.js"
import { ArticleForm } from "./articles/ArticleForm.js"
import { ArticleList } from "./articles/ArticleList.js"
import { EventList } from "./events/EventList.js"
import { getMessages, useMessages } from "./message/MessageDataProvider.js"
import { messageForm } from "./message/MessageForm.js"
import { messageList } from "./message/MessageList.js"
import { FriendList } from "./friends/FriendList.js"
import { defaultWeather } from "./events/WeatherSelect.js"
import { privateMessageList } from "./message/PrivateChatList.js"
import { dispatchPrivateMessage } from "./message/PrivateChatForm.js"
import { LoginForm } from "./auth/LoginForm.js"

const contentTarget = document.querySelector(".dashboard")
const eventHub = document.querySelector(".container")
// this querySelect is so that when nutshell runs it removes the background image rendererd for login.
const resetBackground = document.querySelector(".auth")

export const Nutshell = () => {
    
    contentTarget.innerHTML = `<header>
    <h1>Nutshell</h1>
    
</header>
<section class="formArea"></section>
<section class="homePage"> 
    
    <article class="section messages">        
        <h2 id="message-header">Messages</h2>
        <div id="addFriendTarget"></div>
        <div class="messages__display">
        </div>
        <div class="messages__form"></div>
    </article>
    <article class="section friends">
        <h2>Friends</h2>
    </article>
    <article class="section tasks">
        <h2>Tasks</h2>
        <div class="tasks__display"></div>
        <div class="tasks__complete"></div>
        <button id="task__save"> new task</button>
    </article>
    <article class="section events">
        <h2>Events</h2>
        <div class="events__display">
            <p>EventCards Go here</p>
        </div>
        <div class="event__form">
        </div>
        <button id="event__save"> new event</button>
    </article>
    
    <article class="section articles">
        <h2>Articles</h2>
        <div class="articles__display">
        </div>
        <div class="article__form">
        </div>
        <button id="article__save"> new article</button>
    </article>
    <section class="section">
    <h2>Weather</h2>
    <div class="h4Nashville weatherBox"></div>
    </section>
    <button id="logOut">Log out</button>
</section>`
taskList()
messageList()
ArticleList()
messageForm()
EventList()
FriendList()
defaultWeather()

dispatchPrivateMessage()

// If someone clicks logout, clear the session storage then reload the current page
eventHub.addEventListener("click", event => {
    if (event.target.id === "logOut") {
        sessionStorage.clear()
        location.reload()

    }
})
// this removes the login background div of class "auth"
resetBackground.remove()
}

eventHub.addEventListener("userAuthenticated", Nutshell)

// This will dispatch to taskForm.js
eventHub.addEventListener("click", event => {
    if (event.target.id === "task__save") {
        const addTask = new CustomEvent("createTask")
        eventHub.dispatchEvent(addTask)
    }
})
eventHub.addEventListener("userAuthenticated", Nutshell)
