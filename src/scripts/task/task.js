// This function will take an individual task object and return an html string. I put it in a div called task card for styling purposes in the future.
export const taskHtml = (taskObj) => {
    return `
    <div class="task__card">
        <h3>${taskObj.task}</h3>
        <p>Expected Completion Date: ${taskObj.completionDate}</p>
    </div>
    `
}