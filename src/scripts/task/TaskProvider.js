// This module will handle interacting with the tasks resource from the json

const eventHub = document.querySelector(".container")
// Initialize empty array to eventually store parsed data from tasks resource in
let tasks = []

// Function that can be used in other modules which has a copy of the tasks array. This way original data remains unchanged.
export const useTasks = () => tasks.slice()

// Function to get the tasks from the json resource
export const getTasks = () => {
    return fetch("http://localhost:8088/tasks")
    // turn them into json readable
    .then(response => response.json())
    // store the parsed data in the tasks array initialized earlier
    .then(parsedData => tasks = parsedData)
}


export const saveTask = (newTask) => {
    return fetch("http://localhost:8088/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    })
    // get tasks again, since they have been updated
    .then(getTasks)
    // run this function to dispatch to taskList.js
    .then(dispatchStateChangeEvent)
}

// dispatched to taskList.js
const dispatchStateChangeEvent = () => {
    const tasksStateChanged = new CustomEvent("taskStateChanged")
    eventHub.dispatchEvent(tasksStateChanged)
}

export const deleteTask = (id) => {
    return fetch(`http://localhost:8088/tasks/${id}`, {
        method: "delete"
    })
    // get tasks again, since they have been updated
    .then(getTasks)
    // run this function to dispatch to taskList.js
    .then(dispatchStateChangeEvent)    
}