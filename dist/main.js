"use strict";

$(document).ready(function () {
  var $form = $(".js--form");
  var $input = $(".js--form__input");
  var $todosWrapper = $(".js--todos-wrapper");
  var modal = new bootstrap.Modal("#todoModal");
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function renderTodos() {
    $todosWrapper.empty();
    todos.forEach(function (todo, index) {
      var $li = $("<li>").addClass("todo-item").toggleClass("todo-item--checked", todo.checked);
      $li.html("\n\t\t\t\t<input type=\"checkbox\" ".concat(todo.checked ? "checked" : "", " data-index=\"").concat(index, "\" />\n\t\t\t\t<span class=\"todo-item__description\" data-index=\"").concat(index, "\">").concat(todo.text, "</span>\n\t\t\t\t<button class=\"todo-item__delete\" data-index=\"").concat(index, "\">\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438</button>\n\t\t\t\t"));
      $todosWrapper.append($li);
    });
  }
  $form.on("submit", function (e) {
    e.preventDefault();
    var todoText = $input.val();
    if (todoText) {
      todos.push({
        text: todoText,
        checked: false
      });
      saveTodos();
      renderTodos();
      $input.val("");
    }
  });
  $todosWrapper.on("change", 'input[type="checkbox"]', function () {
    var index = $(this).data("index");
    todos[index].checked = this.checked;
    saveTodos();
    renderTodos();
  });
  $todosWrapper.on("click", ".todo-item__delete", function () {
    var index = $(this).data("index");
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });
  $todosWrapper.on("click", ".todo-item__description", function () {
    var index = $(this).data("index");
    $("#modalTaskText").text(todos[index].text);
    modal.show();
  });
  renderTodos();
});