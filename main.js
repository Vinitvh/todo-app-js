const todoInput = document.querySelector(".create-todo-input");
const todoList = document.querySelector(".todo-items");

let todos = [];

todoInput.addEventListener("change", handleTodo);

function handleTodo(e) {
  let todo = e.target.value;
  if (todo.length > 200) {
    console.log("Lengthy");
  }
  let todoObj = {
    title: todo,
  };
  todos = [...todos, todoObj];
  saveTodos();
  displayTodo();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodo() {
  let todoItems = JSON.parse(localStorage.getItem("todos"));
  console.log(todoItems);
  todoItems.forEach((todo) => {
    todoList.innerHTML += `
      <li class="todo-list">
      <span class="list-check"></span>
      ${todo.title}
      <span class="cancel-btn">x</span>
      </li>
      <span class="line"></span>
      `;
  });
}

displayTodo();
