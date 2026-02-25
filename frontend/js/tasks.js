function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) return JSON.parse(data);

  // First-time default tasks
  const defaultTasks = [
    { id: 1, title: "Finish Milestone 2", priority: "High", dueDate: "2026-03-01", status: "Pending" },
    { id: 2, title: "Write DB ERD", priority: "Medium", dueDate: "", status: "Pending" }
  ];

  localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  return defaultTasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();

function renderTasks() {
  const tbody = document.getElementById("tasksTableBody");
  tbody.innerHTML = "";

  for (let task of tasks) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.priority}</td>
      <td>${task.dueDate || "-"}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="toggleComplete(${task.id})">Complete</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  }
}

function toggleComplete(id) {
  for (let task of tasks) {
    if (task.id === id) {
      task.status = task.status === "Pending" ? "Completed" : "Pending";
    }
  }
  saveTasks(tasks);
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

renderTasks();
