// This module is responsible for rendering task information to the DOM
import { getUsers, useUsers } from "../user/UserDataProvider.js"
import {getTasks, useTasks} from "./TaskProvider.js"

// set these to empty arrays with let so that I can access them inside multiple functions if necessary
let userArr = []
let taskArr = []

export const taskList = () => {
    getUsers()
    .then(getTasks)
    .then(() => {
        userArr = useUsers()
        taskArr = useTasks()
        console.log("users: ", userArr, "tasks: ", taskArr)
    })
}