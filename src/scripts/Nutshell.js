import { taskList } from "./task/taskList.js"
import { getMessages, useMessages } from "./message/MessageDataProvider.js"
import { messageForm } from "./message/MessageForm.js"
import { messageList } from "./message/MessageList.js"

const contentTarget = document.querySelector(".dashboard")
const eventHub = document.querySelector(".container")
export const Nutshell = () => {
    
    contentTarget.innerHTML = `<header>
    <h1>Title</h1>
</header>
<section class="formArea"></section>
<section class="homePage">
    <article class="messages">
        <h2>messages</h2>
        <div class="messages__display">
            <p>first message here</p>
        </div>
        <div class="messages__form"></div>
        
    </article>
    <article class="events">
        <h2>events</h2>
        <div class="events__display">
            <p>EventCards Go here</p>
        </div>
        <button id="event__save"> new event</button>
    </article>
    <article class="tasks">
        <h2>tasks</h2>
        <div class="tasks__display">
            <p>Event Cards</p>
        </div>
        <button id="task__save"> new task</button>
    </article>
    <article class="articles">
        <h2>article</h2>
        <div class="articles__display">
            <p>Article Cards Go here</p>
        </div>
        <button id="article__save"> new article</button>
    </article>
    <article class="friends">
        <h2>friends</h2>
        <div class="friends__form">
            <button id="add_friend">add friend</button>
        </div>
        <div class="friends__display">
            <p>FriendsCards Go here</p>
        </div>
    </article>

</section>`
taskList()
messageList()
messageForm()

}
eventHub.addEventListener("userAuthenticated", Nutshell)

// This will dispatch to taskForm.js
eventHub.addEventListener("click", event => {
    if (event.target.id === "task__save") {
        const addTask = new CustomEvent("createTask")
        eventHub.dispatchEvent(addTask)
    }
})