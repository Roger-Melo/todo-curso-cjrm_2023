const formAddTodo = document.querySelector(".form-add-todo");
const inputSearchTodo = document.querySelector(".form-search input");
const todosContainer = document.querySelector(".todos-container");

const handlesAddingTask = event => {
  event.preventDefault();

  const inputValue = getInputValue(event);

  if (isValidInput(inputValue)) {
    addTaskToList(inputValue);
    clearInput();
  }
};

const getInputValue = event => event.target.add.value.trim();

const isValidInput = inputValue => inputValue.length > 0;

const addTaskToList = inputValue => {
  const taskItem = createTaskElement(inputValue);
  todosContainer.appendChild(taskItem);
};

const createTaskElement = inputValue => {
  const listItem = document.createElement("li");
  listItem.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  listItem.innerHTML = `
    <span>${inputValue}</span>
    <i class="far fa-trash-alt delete"></i>
  `;
  return listItem;
};

const clearInput = () => formAddTodo.reset();

const handleTaskDelete = event => {
  const clickedElement = event.target;
  const isDeleteButton = Array.from(clickedElement.classList)
    .includes("delete");

  if (isDeleteButton) {
    const taskItem = clickedElement.parentElement;
    taskItem.remove();
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

const handleSearchChange = event => {
  const inputValue = event.target.value.trim().toLocaleLowerCase();
  filterTodos(inputValue);
};

formAddTodo.addEventListener("submit", handlesAddingTask);

todosContainer.addEventListener("click", handleTaskDelete);

inputSearchTodo.addEventListener("input", handleSearchChange);
