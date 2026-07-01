// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks when page opens
window.onload = function() {
    loadTasks();
};

// Add task button
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Function to add task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(taskText, false);

    saveTask(taskText, false);

    taskInput.value = "";
}

// Create task element
function createTask(text, completed) {

    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = text;

    // Toggle completed
    span.addEventListener("click", function() {
        li.classList.toggle("completed");
        updateStorage();
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "✔";

    completeBtn.onclick = function() {
        li.classList.toggle("completed");
        updateStorage();
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑";

    deleteBtn.onclick = function() {
        li.remove();
        updateStorage();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
}

// Save task
function saveTask(text, completed) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text,
        completed
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}

// Update Local Storage
function updateStorage() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}