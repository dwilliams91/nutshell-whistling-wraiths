import { ArticleForm } from "./articles/ArticleForm.js"
import { ArticleList } from "./articles/ArticleList.js"
import { getMessages, useMessages } from "./message/MessageDataProvider.js"
import { messageForm } from "./message/MessageForm.js"
import { messageList } from "./message/MessageList.js"

const contentTarget = document.querySelector(".dashboard")
const eventHub = document.querySelector(".container")
export const Nutshell = () => {
    
    contentTarget.innerHTML = `<header>
    <h1>Nutshell</h1>
</header>
<section class="formArea"></section>
<section class="homePage">
    <article class="section messages">
        <h2>messages</h2>
        <div class="messages__display">
            <p>first message here</p>
        </div>
        <div class="messages__form"></div>
        
    </article>
    <article class="section events">
        <h2>events</h2>
        <div class="events__display">
            <p>EventCards Go here</p>
        </div>
        <button id="event__save"> new event</button>
    </article>
    <article class="section tasks">
        <h2>tasks</h2>
        <div class="tasks__display">
            <p>Event Cards</p>
        </div>
        <button id="task__save"> new tasks</button>
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
        <div class="friends__form">
            <button id="add_friend">add friend</button>
        </div>
        <div class="friends__display">
            <p>FriendsCards Go here</p>
        </div>
    </article>

</section>`

messageList()
ArticleList()
messageForm()

}
eventHub.addEventListener("userAuthenticated", Nutshell)