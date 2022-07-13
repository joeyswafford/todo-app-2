// grab all id's and store in variables

let tasks = document.getElementById("tasks");
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let add = document.getElementById("add");

// handle form validation first
let formValidation = () => {
  // if form is blank then alert user, otherwise do not alert and accept incoming data
  if (textInput.value === "") {
    console.log("failure. no input detected.");
    msg.innerHTML = "Input task to continue";
  } else {
    console.log("success");
    msg.innerHTML = "";

    acceptData();
    // should dismiss form after accepting the data
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
});

// collect user data and save to local storage
let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  createTask();
};

// should reset form after submitting
let formReset = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// CREATE
let createTask = () => {
  // initialize tasks div as empty
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
      <h5 class="fw-bold">${x.text}</h5>
      <span class="small text-secondary date">${x.date}</span>
      <p>${x.description}</p>

      <span class="btnOptions">
        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `);
  });
  formReset();
};

// allow data to persist on page load
const savedData = localStorage.getItem("data");
//  ^^^ if "data" does not exist in local storage, then this will be undefined
const maybeData = JSON.parse(savedData);
// ^^^ this could be the data object or undefined
if (maybeData !== undefined) {
  data = maybeData;
  console.log(data);
  createTask();
} else {
  data = [];
  // ^^^ set data to an empty array since there is no saved data
}

// READ & UPDATE
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; // targeting selected task and storing in variable

  textInput.value = selectedTask.children[0].innerHTML; // targeting task value
  dateInput.value = selectedTask.children[1].innerHTML; // targeting date value
  textarea.value = selectedTask.children[2].innerHTML; // targeting description value

  deleteTask(e); // using the delete function to remove selected data from local storage, HTML element, and the data array
};

// DELETE

let deleteTask = (e) => {
  e.parentElement.parentElement.remove(); // deletes selected html from screen

  data.splice(e.parentElement.parentElement.id, 1); // deletes targeted task from data array

  localStorage.setItem("data", JSON.stringify(data)); // updates local storage with new data

  console.log(data);
};
