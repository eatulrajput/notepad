document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-task-btn';
    editBtn.addEventListener('click', () => editTask(taskItem));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-task';
    deleteBtn.addEventListener('click', () => deleteTask(taskItem, taskText));

    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const taskList = document.getElementById('task-list');
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
    });
}

function deleteTask(taskItem, taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskItem.remove();
}

function editTask(taskItem) {
    const newTaskText = prompt('Edit your task', taskItem.textContent);
    if (newTaskText) {
        deleteTask(taskItem, taskItem.textContent.trim());
        taskItem.firstChild.textContent = newTaskText.trim();
        saveTask(newTaskText.trim());
    }
}
