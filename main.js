const todoInput = document.querySelector(".create-todo-input");
const todoList = document.querySelector(".todo-items");

let todos = [];

todoInput.addEventListener("change", saveTodo);

function saveTodo(e) {
  let todo = e.target.value;
  if (todo.length > 200) {
    console.log("Lengthy");
  }
  let todoObj = {
    title: todo,
  };
  todos.push(todoObj);
  console.log(todos);
  e.target.value = "";
  displayTodo(todos);
}

function displayTodo(todos) {
  todos.forEach((todo) => {
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
