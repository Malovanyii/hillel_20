$(document).ready(() => {
	const $form = $(".js--form");
	const $input = $(".js--form__input");
	const $todosWrapper = $(".js--todos-wrapper");
	const modal = new bootstrap.Modal("#todoModal");

	const todos = JSON.parse(localStorage.getItem("todos")) || [];

	function saveTodos() {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	function renderTodos() {
		$todosWrapper.empty();
		todos.forEach((todo, index) => {
			const $li = $("<li>")
				.addClass("todo-item")
				.toggleClass("todo-item--checked", todo.checked);

			$li.html(`
				<input type="checkbox" ${todo.checked ? "checked" : ""} data-index="${index}" />
				<span class="todo-item__description" data-index="${index}">${todo.text}</span>
				<button class="todo-item__delete" data-index="${index}">Видалити</button>
				`);

			$todosWrapper.append($li);
		});
	}

	$form.on("submit", (e) => {
		e.preventDefault();
		const todoText = $input.val();
		if (todoText) {
			todos.push({ text: todoText, checked: false });
			saveTodos();
			renderTodos();
			$input.val("");
		}
	});

	$todosWrapper.on("change", 'input[type="checkbox"]', function () {
		const index = $(this).data("index");
		todos[index].checked = this.checked;
		saveTodos();
		renderTodos();
	});

	$todosWrapper.on("click", ".todo-item__delete", function () {
		const index = $(this).data("index");
		todos.splice(index, 1);
		saveTodos();
		renderTodos();
	});

	$todosWrapper.on("click", ".todo-item__description", function () {
		const index = $(this).data("index");
		$("#modalTaskText").text(todos[index].text);
		modal.show();
	});

	renderTodos();
});
