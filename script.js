'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

todoData = JSON.parse(localStorage.getItem('todoData')) || [];

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function () {
      todoData.splice(index, 1);
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

  });
};

todoControl.addEventListener('submit', function (e) {
  e.preventDefault();

  if (headerInput.value.trim() === '') {
    todoControl.children[0].children[0].placeholder = 'Это поле необходдимо заполнить!';
    
  } else {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };
    todoData.push(newTodo);
    render();
    headerInput.value = '';
    localStorage.setItem('todoData', JSON.stringify(todoData));
    todoControl.children[0].children[0].placeholder = 'Какие планы?';
  }
});

headerInput.value = '';

render();
