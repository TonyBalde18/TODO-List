//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

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
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //add tag to the button
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv); //ln 13
  //clear the input area after clicking on add btn
  todoInput.value = "";
}
//Delete a task
//apply fall and fade animation first and then remove the task from the list
function deleteTodo(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
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

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    /*retrieve the value defined on the html file*/
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break; /*supposed to show all the tasks, since it shows by default -> skip */
      case "completed":
        if (todo.classList.contains("completed")) {
          /*check if the task is completed and show it*/
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")) {
          /*show every task that is not completed*/
          todo.styles.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
