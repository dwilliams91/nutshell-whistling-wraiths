import {saveTask} from "./TaskProvider.js"
// This module is responsible for creating and rendering the task form

const eventHub = document.querySelector(".container")
let contentContainer =""
export const taskForm = () => {
    contentContainer = document.querySelector(".formArea")
    contentContainer.innerHTML = `
    <section class="taskForm">
        <input type="text" id="task--name" placeholder="task name" />
        <label for="form--completionDate">Expected completion date</label>
        <input type="date" id="task--completionDate" />
        <button id="saveTask">Save Task</button>
    </section>
    `
}

// This was dispatched from Nutshell.js
eventHub.addEventListener("createTask", taskForm)


eventHub.addEventListener("click", event => {
    contentContainer = document.querySelector(".formArea")
    if (event.target.id === "saveTask") {
        // Use parseInt to be sure it saves the foreign key as an integer instead of a string
        const userId = parseInt(sessionStorage.getItem("activeUser"))
        const task = document.querySelector("#task--name").value
        const completionDate = document.querySelector("#task--completionDate").value
        const complete = false

        const newTask = {
            userId,
            task,
            completionDate,
            complete
        }
        // get this from TaskProvider.js
        saveTask(newTask)
        // set the form container back to empty after clicking the save button
        contentContainer.innerHTML = ""
    }
})