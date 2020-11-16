const contentTarget = document.querySelector(".friends__form")


contentTarget.innerHTML = `
    <div class="friend__input">
    <textarea id="entryText" placeholder="Write New Friend's Name Here"></textarea> 
    <button id="add_friend">add friend</button>
    </div>`