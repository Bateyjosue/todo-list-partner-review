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
          <span class="${todo.index}">${todo.description}</span>
        </label>
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
const checkTaskSpan = document.querySelectorAll('.task span');
const checkTaskIcon = document.querySelectorAll('.task i');
const addTaskInput = document.querySelector('.add-task input');
// const clearAll = document.querySelector('.clear');
const trash = document.querySelectorAll('.bi-trash');

checkTask.forEach((task) => {
  task.addEventListener('click', (e) => {
    checkTaskSpan.item(e.target.value - 1).classList.toggle('line');
    e.target.classList.toggle('hide');
    checkTaskIcon.item(e.target.value - 1).classList.toggle('visible');
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

// clearAll.addEventListener('click', () => {
//   checkTask.forEach((element) => {
//     if (element.classList.contains('hide')) {
//       task.removerTask(element.value - 1);
//       todoList.removeChild(element.closest('li'));
//       task.updateTask();
//     }
//   });
// });
