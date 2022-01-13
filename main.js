const txtInput = document.querySelector(".txt-input");
const itemsLeft = document.querySelector(".items-left");
const clear = document.querySelector(".clear-completed");
const themeToggle = document.querySelector(".theme-toggle");

function main() {
  checkCompleted();
  addTodo();
  // theme-switcher
  themeToggle.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("light");
    const themeImg = this.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./images/icon-sun.svg"
        ? "./images/icon-moon.svg"
        : "./images/icon-sun.svg"
    );
  });
  // filter todo - all, active, completed
  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });

  txtInput.addEventListener("change", (e) => {
    e.preventDefault();
    const item = txtInput.value.trim();
    if (item) {
      let todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      let currentTodo = {
        item,
        isCompleted: false,
      };
      if (todos.item === item) {
        console.log(true);
        alert("Todo already exists!");
      } else {
        addTodo([currentTodo]);
        todos.push(currentTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    }
    txtInput.value = "";
    txtInput.focus();
  });
}

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
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
            // let itemsLeft = checkCompleted();
            itemsLeft.textContent = checkCompleted();
          }
        });
      }
      if (!checked) {
        todo.isCompleted = false;
        localStorage.setItem("todos", JSON.stringify(todos));
        para.style.textDecoration = "none";
        itemsLeft.textContent = checkCompleted();
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

function removeTodo(element) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].item === element) {
      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}

function checkCompleted() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  falseCount = 0;
  todos.forEach((todo) => {
    if (todo.isCompleted === false) {
      falseCount = falseCount + 1;
      itemsLeft.textContent = falseCount;
    }
  });
  return falseCount;
}

clear.addEventListener("click", () => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].isCompleted === true) {
      todos.splice(i, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
});

document.addEventListener("DOMContentLoaded", main);
