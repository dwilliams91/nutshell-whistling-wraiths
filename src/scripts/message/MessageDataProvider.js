
let messages = []

export const useMessages = () => {
    return messages.slice()
}

export const getMessages = () => {
    return fetch(`http://localhost:8088/messages`)
        .then(response => response.json())
        .then(parsedMessages => {
            messages = parsedMessages
        })
}
export const saveMessages=(message)=>{
    return fetch(`http://localhost:8088/messages`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(getMessages)
}

export const deleteMessage=(messageId)=>{
    return fetch(`http://localhost:8088/messages/${messageId}`,{
    method:"delete"
    })
    .then(getMessages)
}
export const editMessage = (messageId) => {
    return fetch(`http://localhost:8088/messages/${messageId.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageId)
    })
    .then(getMessages)
}
