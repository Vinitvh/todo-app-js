const todos = [
  {
    item: "To complete JavaScript",
    isCompleted: false,
  },

  {
    item: "To Meditate",
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
