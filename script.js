document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            createTodoItem(taskText);
            todoInput.value = "";
        }
    });

    function createTodoItem(taskText) {
        const li = document.createElement("li");
        li.className = "todo-item";

        const taskDiv = document.createElement("div");
        taskDiv.contentEditable = "false";
        taskDiv.textContent = taskText;
        li.appendChild(taskDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "buttons";
        
        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "編集";
        editBtn.addEventListener("click", () => {
            taskDiv.contentEditable = (taskDiv.contentEditable === "true") ? "false" : "true";
            taskDiv.focus();
        });
        buttonsDiv.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "削除";
        deleteBtn.addEventListener("click", () => {
            todoList.removeChild(li);
        });
        buttonsDiv.appendChild(deleteBtn);

        li.appendChild(buttonsDiv);

        li.setAttribute("draggable", "true");
        li.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", event.target.id);
            event.target.style.opacity = "0.5";
        });

        li.addEventListener("dragend", (event) => {
            event.target.style.opacity = "";
        });

        todoList.appendChild(li);

        todoList.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        todoList.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedId = event.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggedId);
            const targetElement = event.target.closest(".todo-item");
            if (draggedElement && targetElement && draggedElement !== targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const offsetY = event.clientY - rect.top;
                if (offsetY <= rect.height / 2) {
                    todoList.insertBefore(draggedElement, targetElement);
                } else {
                    todoList.insertBefore(draggedElement, targetElement.nextSibling);
                }
            }
        });

        const itemId = `todo-item-${Date.now()}`;
        li.id = itemId;
        event.dataTransfer.setData("text/plain", itemId);
    }
});
