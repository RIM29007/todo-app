const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const viewButton = document.getElementById('view-button');
const logoutButton = document.getElementById('logout-button');

let username = localStorage.getItem('currentUser');
if(!username) {
    // Si aucun user connecté, retourner à login
    window.location.href = 'login.html';
}
let tasks = JSON.parse(localStorage.getItem(username)) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.style.opacity = 0;
        if(task.completed) li.classList.add('completed');

        // Toggle Completed
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            localStorage.setItem(username, JSON.stringify(tasks));
            renderTasks();
        });

        // Edit
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newText = prompt("Edit your task:", task.text);
            if(newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                localStorage.setItem(username, JSON.stringify(tasks));
                renderTasks();
            }
        });

        // Delete
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            localStorage.setItem(username, JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);

        // Fade-in animation
        setTimeout(() => {
            li.style.transition = "opacity 0.5s ease";
            li.style.opacity = 1;
        }, 50);
    });
}

// Ajouter tâche
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if(text === '') return;
    tasks.push({text, completed: false});
    localStorage.setItem(username, JSON.stringify(tasks));
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
});

// Ajouter tâche avec Enter
taskInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') addButton.click();
});

// View List
viewButton.addEventListener('click', () => {
    if(tasks.length === 0) {
        alert("No tasks yet!");
    } else {
        let allTasks = "";
        tasks.forEach((task, index) => {
            allTasks += (index+1) + ". " + task.text + (task.completed ? " ✅" : "") + "\n";
        });
        alert(allTasks);
    }
});

// Logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Affichage initial
renderTasks();