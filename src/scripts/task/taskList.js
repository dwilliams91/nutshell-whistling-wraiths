// This module is responsible for rendering task information to the DOM
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { taskHtml } from "./task.js"
import { editTaskForm } from "./taskForm.js"
import {getTasks, updateTask, useTasks} from "./TaskProvider.js"

const eventHub = document.querySelector(".container")



// set these to empty arrays with let so that I can access them inside multiple functions if necessary
let userArr = []
let taskArr = []

// Render the current user's tasks to the DOM
export const taskList = () => {
    getUsers()
    .then(getTasks)
    .then(() => {
        userArr = useUsers()
        taskArr = useTasks()
        render()
    })
}

const render = () => {
    // Select the html element to render to
    const contentContainer = document.querySelector(".tasks__display")
    // get the id of the current user. Use parseInt to convert from string to integer
    const id = parseInt(sessionStorage.getItem("activeUser"))
    // get the tasks related to the current user
    const relatedTasks = taskArr.filter(task => task.userId === id && task.complete === false)
    // Iterate through the related tasks and generate the html
    const taskString = relatedTasks.map(task => taskHtml(task))
    // place the newly generated html in the element previously selected
    contentContainer.innerHTML = taskString.join("")
}

// broadcast from TaskProvider.js, after a new task has been added, this will make taskList rerun so that the new task also renders to the DOM
eventHub.addEventListener("taskStateChanged", taskList)

// Broadcast from task.js. Once the radio button has been selected, run this code to update the relevant task object in the JSON server.
eventHub.addEventListener("taskCompleted", event => {
    const task = taskArr.find(task => task.id === event.detail.id)
    const completedTask = {
        id: task.id,
        completionDate: task.completionDate,
        userId: task.userId,
        task: task.task,
        complete: true
    }
    updateTask(completedTask)
})

// Broadcast from task.js
eventHub.addEventListener("taskEdit", event => {
        const task = taskArr.find(task => task.id === event.detail.id)
        editTaskForm(task)
})

// Broadcast from taskForm.js
eventHub.addEventListener("taskEdited", event => {
    const task = taskArr.find(task => task.id === event.detail.id)
    const editedTask = {
        id: task.id,
        completionDate: event.detail.editedTask.completionDate,
        userId: event.detail.editedTask.userId,
        task: event.detail.editedTask.task,
        complete: false
    }
    updateTask(editedTask)
})