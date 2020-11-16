// This function will take an individual task object and return an html string. I put it in a div called task card for styling purposes in the future.
import {getTasks, deleteTask} from "./TaskProvider.js"
const eventHub = document.querySelector(".container")
export const taskHtml = (taskObj) => {
    return `
    <div class="task__card">
        <h3>${taskObj.task}</h3>
        <p>Expected Completion Date: ${taskObj.completionDate}</p>
        <button id="deleteTask--${taskObj.id}">Delete task</button>
    </div>
    `
}

// if delete button clicked, run the program from TaskProvider.js
eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("deleteTask--")) {
        // isolate the id from the taskObj
        const [prefix, id] = event.target.id.split("--")
        // Pass that ID as the argument for the deleteTask function
        deleteTask(id)        
    }
})