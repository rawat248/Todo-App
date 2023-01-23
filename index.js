let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let message = document.getElementById("msg");
let date = document.getElementById("dateInput");
let textarea = document.getElementById("textArea");
let task = document.getElementById("tasks");
let add = document.getElementById("add");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    message.innerHTML = "Please fill input field";
  } else {
    console.log("success");
    acceptData();
    message.innerHTML = "";
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: date.value,
    desc: textarea.value,
  });

  localStorage.setItem("abc", JSON.stringify(data));
  console.log(data);
  createTask();
};

let createTask = () => {
  task.innerHTML = "";
  data.map((x, y) => {
    return (task.innerHTML += `
        <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="text-secondary">${x.date}</span>
                <p>${x.desc}</p>
                <span class="options">
                    <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                    <i onClick="deleteTask(this);createTask()" class="fas fa-trash-alt"></i>
                </span>
            </div>
        `);
    resetForm();
  });
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("abc", JSON.stringify(data));
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  date.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  date.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("abc")) || [];
  createTask();
})();
