const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render tasks
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("completed");
    }

    // Toggle complete
    li.addEventListener("click", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    // Delete button
    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    actions.appendChild(deleteBtn);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

// Add new task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  todos.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();