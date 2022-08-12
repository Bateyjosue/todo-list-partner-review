export default class Task {
  constructor(description) {
    this.tasks = JSON.parse(localStorage.getItem('toDoList')) || [];
    this.index = null;
    this.completed = false;
    this.description = description;
  }

  addTask = (description) => {
    this.tasks.push({
      index: this.tasks.length,
      description,
      completed: false,
    });
  };

  removerTask = (index) => {
    this.tasks.splice(index, 1);
    this.tasks = this.tasks.map((task, index) => ({
      ...task, index,
    }));
  };

  editTask = (index, value) => {
    if (index === -1) return;
    this.tasks[index].description = value;
    this.updateTask();
  }

  updateTask = () => localStorage.setItem('toDoList', JSON.stringify(this.tasks));
}