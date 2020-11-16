let users = []

export const useUsers = () => users.slice()


export const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedData => users = parsedData)
}