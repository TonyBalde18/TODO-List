//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //check if content is loaded and then execute the function
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(e) {
  //prevent form from submitting
  e.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //display the user input
  //Add task to local storage
  saveLocalTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = ""; //clear the input area after clicking on add btn
  //Completed task button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`; //add tag to the button
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
}
//Delete a task
//apply fall and fade animation first and then remove the task from the list
function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", (e) => {
      //will execute the function after animation finishes
      todo.remove();
    });
  }
  //Check mark on a completed task
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    //retrieve the value defined on the html file
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break; //supposed to show all the tasks, since it shows by default -> skip
      case "completed":
        if (todo.classList.contains("completed")) {
          //check if the task is completed and show it
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          //show every task that is not completed
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//Save tasks into local storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    //check if there are tasks on the list
    //in case there is no task on the list -> create empty array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //assuming that there is task on the list
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); //push back into Local Storage
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos)); //get the index of the task inside the array
  //first argument -> from what position will be deleted an element
  //second argument -> how many elements will be removed
  todos.splice(todos.indexOf(todoIndex), 1); //access the text
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //value from the local storage
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
