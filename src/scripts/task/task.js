// This function will take an individual task object and return an html string. I put it in a div called task card for styling purposes in the future.
import {getTasks, deleteTask} from "./TaskProvider.js"
const eventHub = document.querySelector(".container")
export const taskHtml = (taskObj) => {
    return `
    <div class="task__card">
        <h3>${taskObj.task}</h3>
        <p>Expected Completion Date: ${taskObj.completionDate}</p>
        <label for="taskComplete--${taskObj.id}">Select once task completed</label>
        <input type="radio" id="taskComplete--${taskObj.id}" value="check once completed">
        <button id="deleteTask--${taskObj.id}">Delete task</button>
        <button id="editTask--${taskObj.id}">Edit task</button>
    </div>
    `
}

// If the edit task button is clicked, dispatch this event and include the task objects id in the detail
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("editTask")) {
        const [prefix, id] = event.target.id.split("--")
        const editTask = new CustomEvent("taskEdit", {
            detail: {
                id: parseInt(id)
            }
        })
        eventHub.dispatchEvent(editTask)
    }
})

// if delete button clicked, run the program from TaskProvider.js
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteTask--")) {
        // isolate the id from the taskObj
        const [prefix, id] = event.target.id.split("--")
        // Pass that ID as the argument for the deleteTask function
        deleteTask(id)        
    }
})

// Dispatch to taskList.js when radio button selected
eventHub.addEventListener("change", event => {
    if (event.target.id.startsWith("taskComplete--")) {
        const [prefix, id] = event.target.id.split("--")
        const radioButtonClicked = new CustomEvent("taskCompleted", {
            detail: {
                id: parseInt(id)
            }
        })
        eventHub.dispatchEvent(radioButtonClicked)
    }
})