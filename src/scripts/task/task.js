export const taskHtml = (taskObj) => {
    return `
    <div class="task__card">
        <h3>${taskObj.task}</h3>
        <p>Expected Completion Date: ${taskObj.completionDate}</p>
    </div>
    `
}