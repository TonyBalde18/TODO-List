//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//FUNCTIONS
function addTodo(event) {
  event.preventDefault(); //prevent form for submitting
  //TODO div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //display the user input
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); //sticking to the Div ln 13
  //Completed task button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //add tag to the button
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; //add tag to the button
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //Append to list
  todoList.appendChild(todoDiv); //ln 13
  //clear the input area after clicking on add btn
  todoInput.value = "";
}
//Delete a task
//apply fall and fade animation first and then remove the task from the list
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall"); //Animation
    todo.addEventListener("transitionend", function () {
      //will execute the function after animation finishes
      todo.remove();
    });
  }

  //Check mark on a completed task
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
