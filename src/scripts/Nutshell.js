import { taskList } from "./task/taskList.js"
import { ArticleForm } from "./articles/ArticleForm.js"
import { ArticleList } from "./articles/ArticleList.js"
import { EventList } from "./events/EventList.js"
import { getMessages, useMessages } from "./message/MessageDataProvider.js"
import { messageForm } from "./message/MessageForm.js"
import { messageList } from "./message/MessageList.js"
import { FriendList } from "./friends/FriendList.js"
<<<<<<< HEAD
import { defaultWeather } from "./events/WeatherSelect.js"
=======
import { privateMessageList } from "./message/PrivateChatList.js"
import { dispatchPrivateMessage } from "./message/PrivateChatForm.js"
>>>>>>> master

const contentTarget = document.querySelector(".dashboard")
const eventHub = document.querySelector(".container")
export const Nutshell = () => {
    
    contentTarget.innerHTML = `<header>
    <h1>Nutshell</h1>
</header>
<section class="formArea"></section>
<section class="homePage">
    <article class="section messages">        
        <h2 id="message-header">messages</h2>
        <div id="addFriendTarget"></div>
        <div class="messages__display">
        </div>
        <div class="messages__form"></div>
    </article>
    <article class="section events">
        <h2>events</h2>
        <div class="events__display">
            <p>EventCards Go here</p>
        </div>
        <div class="event__form">
        </div>
        <button id="event__save"> new event</button>
    </article>
    <article class="section tasks">
        <h2>tasks</h2>
        <div class="tasks__display">
            <p>Event Cards</p>
        </div>
        <button id="task__save"> new task</button>
    </article>
    <article class="section articles">
        <h2>article</h2>
        <div class="articles__display">
            <p>Article Cards Go here</p>
        </div>
        <div class="article__form">
        </div>
        <button id="article__save"> new article</button>
    </article>
    <article class="section friends">
        <h2>friends</h2>
    </article>
<<<<<<< HEAD
    <section class="weatherBox">
        <div class="h4Nashville"></div>
    </section>
=======


>>>>>>> master
</section>`
taskList()
messageList()
ArticleList()
messageForm()
EventList()
FriendList()
<<<<<<< HEAD
defaultWeather()

=======
dispatchPrivateMessage()
>>>>>>> master
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
