// This module is responsible for rendering task information to the DOM
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import { taskHtml } from "./task.js"
import {getTasks, useTasks} from "./TaskProvider.js"

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
    // get the id of the current user
    const id = parseInt(sessionStorage.getItem("activeUser"))
    // get the tasks related to the current user
    const relatedTasks = taskArr.filter(task => task.userId === id)
    // Iterate through the related tasks and generate the html
    const taskString = relatedTasks.map(task => taskHtml(task))
    // place the newly generated html in the element previously selected
    contentContainer.innerHTML = taskString.join("")
}

// broadcast from TaskProvider.js, after a new task has been added, this will make taskList rerun so that the new task also renders to the DOM
eventHub.addEventListener("taskStateChanged", taskList)