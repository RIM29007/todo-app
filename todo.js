const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const viewButton = document.getElementById('view-button');
const logoutButton = document.getElementById('logout-button');

let username = localStorage.getItem('currentUser');

if(!username)
{
window.location.href = 'index.html';
}

let tasks = JSON.parse(localStorage.getItem(username)) || [];

function renderTasks()
{
taskList.innerHTML = '';

tasks.forEach((task, index) =>
{

const li = document.createElement('li');

li.textContent = task.text;

if(task.completed)
{
li.classList.add('completed');
}

li.addEventListener('click', () =>
{
task.completed = !task.completed;

localStorage.setItem(username, JSON.stringify(tasks));

renderTasks();
});

const editBtn = document.createElement('button');
editBtn.textContent = 'Edit';

editBtn.addEventListener('click', (e) =>
{

e.stopPropagation();

const newText = prompt("Edit your task:", task.text);

if(newText !== null && newText.trim() !== '')
{
task.text = newText.trim();

localStorage.setItem(username, JSON.stringify(tasks));

renderTasks();
}

});

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';

deleteBtn.addEventListener('click', (e) =>
{

e.stopPropagation();

tasks.splice(index,1);

localStorage.setItem(username, JSON.stringify(tasks));

renderTasks();

});

li.appendChild(editBtn);
li.appendChild(deleteBtn);

taskList.appendChild(li);

});

}

addButton.addEventListener('click', () =>
{

const text = taskInput.value.trim();

if(text === '') return;

tasks.push(
{
text:text,
completed:false
});

localStorage.setItem(username, JSON.stringify(tasks));

taskInput.value = '';

renderTasks();

});

taskInput.addEventListener('keyup', (e) =>
{

if(e.key === 'Enter')
{
addButton.click();
}

});

viewButton.addEventListener('click', () =>
{

if(tasks.length === 0)
{
alert("No tasks yet!");
}

else
{

let allTasks = "";

tasks.forEach((task,index) =>
{

allTasks += (index+1) + ". " + task.text;

if(task.completed)
{
allTasks += " ✓";
}

allTasks += "\n";

});

alert(allTasks);

}

});

logoutButton.addEventListener('click', () =>
{

localStorage.removeItem('currentUser');

window.location.href = 'login.html';

});

renderTasks();