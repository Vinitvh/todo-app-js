const todos = [
  {
    item: "To complete JavaScript",
    isCompleted: false,
  },

  {
    item: "To Meditate",
    isCompleted: true,
  },

  {
    item: "Sleep early",
    isCompleted: false,
  },
];

localStorage.setItem("todos", JSON.stringify(todos));

function addTodo() {
  let todos = JSON.parse(localStorage.getItem("todos"));

  if (!todos) {
    return null;
  }
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const para = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    li.classList.add("card");
    div.classList.add("check-container");
    input.classList.add("check-input");
    span.classList.add("check");
    para.classList.add("item");
    button.classList.add("clear");

    input.setAttribute("type", "checkbox");
    img.setAttribute("src", "./images/icon-cross.svg");
    img.setAttribute("alt", "delete");

    para.textContent = todo.item;

    if (todo.isCompleted) {
      li.classList.add("checked");
      input.setAttribute("checked", "checked");
    }

    input.addEventListener("click", function () {
      const element = this.parentElement.nextElementSibling.textContent;
      const checked = this.checked;
      if (checked) {
        todos.forEach((todo) => {
          if (todo.item === element) {
            todo.isCompleted = true;
            localStorage.setItem("todos", JSON.stringify(todos));
            para.style.textDecoration = "line-through";
          }
        });
      }
      if (!checked) {
        todo.isCompleted = false;
        localStorage.setItem("todos", JSON.stringify(todos));
        para.style.textDecoration = "none";
      }
    });

    button.addEventListener("click", () => {
      const element =
        button.parentElement.firstElementChild.nextElementSibling.textContent;
      // console.log(element);
      removeTodo(element);
      button.parentElement.remove();
    });

    li.appendChild(div);
    div.appendChild(input);
    div.appendChild(span);
    li.appendChild(para);
    button.appendChild(img);
    li.appendChild(button);
    document.querySelector(".todos").appendChild(li);
  });
}

addTodo();

function removeTodo(element) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].item === element) {
      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}
