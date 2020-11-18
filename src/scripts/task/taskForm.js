import { saveTask } from "./TaskProvider.js"
// This module is responsible for creating and rendering the task form

const eventHub = document.querySelector(".container")
let contentContainer = ""
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

export const editTaskForm = (taskObj) => {
    contentContainer = document.querySelector(".formArea")
    contentContainer.innerHTML = `
    <section class="taskForm">
        <input type="text" id="editedTask--name" value="${taskObj.task}" />
        <label for="form--editedCompletionDate">Expected completion date</label>
        <input type="date" id="task--editedCompletionDate" value="${taskObj.completionDate}"/>
        <button id="saveEdit--${taskObj.id}">Edit Task</button>
    </section>
    `
}

// This was dispatched from Nutshell.js
eventHub.addEventListener("createTask", taskForm)

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("saveEdit")) {
        const [prefix, id] = event.target.id.split("--")
        const userId = parseInt(sessionStorage.getItem("activeUser"))
        const task = document.querySelector("#editedTask--name").value
        const completionDate = document.querySelector("#task--editedCompletionDate").value
        const complete = false
        const saveEdit = new CustomEvent("taskEdited", {
            detail: {
                id: parseInt(id),
                editedTask: {
                    userId,
                    task,
                    completionDate,
                    complete: false
                }
            }
        })
        eventHub.dispatchEvent(saveEdit)
    }
})


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