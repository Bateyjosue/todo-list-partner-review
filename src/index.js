import './style.css';
import Task from './task.js';
import Status from './status.js';

const task = new Task();
const status = new Status();

const todoList = document.querySelector('.todo-list');

const getTodo = () => {
  task.tasks.forEach((todo) => {
    todoList.innerHTML += `
      <li>
        <label class="task">
          <input type="checkbox" id="" name="" value="${todo.index}" class="check-task">
        </label>
        <span class=" description">
          <span class="${todo.index} | desc">${todo.description}</span>
          <input type="text" name="" id="${todo.index}" value="${todo.description}" class="edit" />
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
const addTaskInput = document.querySelector('.add-task input');
const clearAll = document.querySelector('.clear');
const trash = document.querySelectorAll('.bi-trash');
const edit = document.querySelectorAll('.bi-three-dots-vertical');

[...edit].forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.target.parentNode.parentNode.style.backgroundColor = '#d9b16660';
    e.target.style.display = 'none';
    trash.item(index).style.display = 'block';
  });
});

task.tasks.forEach((task, index) => {
  if (task.completed) {
    checkTask.item(index).checked = true;
    checkTask.item(index).classList.add('hide');
    checkTaskSpan.item(index).classList.add('line');
  }
});

checkTask.forEach((task) => {
  task.addEventListener('click', (e) => {
    if (e.target.checked) {
      status.updateStatus(e.target.value, false);
      e.target.checked = true;
      // checkTaskSpan.item(e.target.value).classList.remove('line');
      window.location.reload();
    } else {
      status.updateStatus(e.target.value, true);
      e.target.checked = false;
      // checkTaskSpan.item(e.target.value).classList.add('line');
      window.location.reload();
    }
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
    window.location.reload();
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
    task.removerTask(element.value);
    todoList.removeChild(element.closest('li'));
    task.updateTask();
  }
};

clearAll.addEventListener('click', () => {
  [...checkTask].filter(remove);
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