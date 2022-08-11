import './style.css';

const toDoList = [
  {
    index: 1,
    completed: false,
    description: 'Wash the dishes',
  },
  {
    index: 2,
    completed: false,
    description: 'Complete To Do list project',
  },
  {
    index: 3,
    completed: false,
    description: 'Make Breakfast',
  },
  {
    index: 4,
    completed: true,
    description: 'Morning Prayer',
  },
];

const todoList = document.querySelector('.todo-list');

const getTodo = () => {
  toDoList.forEach((todo) => {
    todoList.innerHTML += `
      <li>
        <label class="task">
          <i class="bi bi-check"></i>
          <input type="checkbox" id="" name="" value="${todo.index}" class="check-task">
          <span class="${todo.index}">${todo.description}</span>
        </label>
        <i class="bi bi-three-dots-vertical"></i>
      </li>
    `;
  });
};

getTodo();

const checkTask = document.querySelectorAll('.check-task');
const checkTaskSpan = document.querySelectorAll('.task span');
const checkTaskIcon = document.querySelectorAll('.task i');
checkTask.forEach((task) => {
  task.addEventListener('click', (e) => {
    checkTaskSpan.item(e.target.value - 1).classList.toggle('line');
    e.target.classList.toggle('hide');
    checkTaskIcon.item(e.target.value - 1).classList.toggle('visible');
  });
});