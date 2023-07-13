const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchTodo = document.querySelector(".form-search input");
const todosContainer = document.querySelector(".todos-container");

const addTodo = event => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();

  if (inputValue.length > 0) {
    const todo = document.createElement("li");

    todo.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    todo.innerHTML = `<span>${inputValue}</span><i class="far fa-trash-alt delete"></i>`;
    
    todosContainer.appendChild(todo);
    formAddTodo.reset();
  }
};

const deleteTodo = event => {
  const clickedElement = event.target;
  const isDeleteButton = clickedElement.classList.contains("delete");

  if (isDeleteButton) {
    const todo = clickedElement.parentElement;
    todo.remove();
  }
};

const filterTodos = inputValue => {
  Array.from(todosContainer.children).forEach((todo) => {
    const todoText = todo.textContent.toLocaleLowerCase();
    const isMatch = todoText.includes(inputValue);

    todo.classList.toggle("hidden", !isMatch);
    todo.classList.toggle("d-flex", isMatch);
  });
};

const searchTodo = event => {
  const inputValue = event.target.value.trim().toLocaleLowerCase();
  filterTodos(inputValue);
};

formAddTodo.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", deleteTodo);
inputSearchTodo.addEventListener("input", searchTodo);
