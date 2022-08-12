import './style.css';
import Task from './task.js';

const task = new Task();

const todoList = document.querySelector('.todo-list');

const getTodo = () => {
  task.tasks.forEach((todo) => {
    todoList.innerHTML += `
      <li>
        <label class="task">
          <i class="bi bi-check"></i>
          <input type="checkbox" id="" name="" value="${todo.index}" class="check-task">
        </label>
        <span class=" description">
          <span class="${todo.index} | desc">${todo.description}</span>
          <input type="text" name="" id="${todo.index}" value="${todo.description}" />
        </span>
        <span class="task-edit">
          <i class="bi bi-three-dots-vertical"></i>
          <i class="bi bi-trash" id="${todo.index}"></i>
        </span>
      </li>
    `;
  });
};

getTodo();

const checkTask = document.querySelectorAll('.check-task');
const checkTaskSpan = document.querySelectorAll('.description span');
const description = document.querySelectorAll('.description');
const descriptionInput = document.querySelectorAll('.description input');
const checkTaskIcon = document.querySelectorAll('.task i');
const addTaskInput = document.querySelector('.add-task input');
const clearAll = document.querySelector('.clear');
const trash = document.querySelectorAll('.bi-trash');

checkTask.forEach((task) => {
  task.addEventListener('click', (e) => {
    checkTaskSpan.item(e.target.value).classList.toggle('line');
    e.target.classList.toggle('hide');
    checkTaskIcon.item(e.target.value).classList.toggle('visible');
  });
});

description.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (e.target.classList.contains('desc')) {
      e.target.style.display = 'none';
      e.target.nextElementSibling.style.display = 'block';
    }
  });
});

descriptionInput.forEach((el) => {
  el.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      task.editTask(e.target.id, e.target.value);
      window.location.reload();
    }
  });
});

addTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    task.addTask(e.target.value);
    task.updateTask();
    todoList.innerHTML += `
      <li>
        <label class="task">
          <i class="bi bi-check"></i>
          <input type="checkbox" id="" name="" value="" class="check-task">
          <span class="">${e.target.value}</span>
        </label>
        <span class="task-edit">
          <i class="bi bi-three-dots-vertical"></i>
          <i class="bi bi-trash"></i>
        </span>
      </li>
    `;
    addTaskInput.value = '';
  }
});

trash.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-trash')) {
      task.removerTask(e.target.id);
      task.updateTask();
      todoList.removeChild(e.target.closest('li'));
    }
  });
});

const remove = (element) => {
  if (element.classList.contains('hide')) {
    task.removerTask(element.value - 1);
    todoList.removeChild(element.closest('li'));
    task.updateTask();
  }
};

clearAll.addEventListener('click', () => {
  [...checkTask].filter(remove);
});