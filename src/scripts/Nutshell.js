const contentTarget = document.querySelector(".dashboard")
const eventHub = document.querySelector(".container")
export const Nutshell = () => {
    // Render all your UI components here
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
        <input type="text" id="messages__form">
        <button id="messages__save"> post</button>
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
        <button id="task__save"> new tasks</button>
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
}
eventHub.addEventListener("userAuthenticated", Nutshell)
