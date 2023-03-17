// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;



// FUNÇÔES
    // salva uma nova tarefa
const saveTodo = (text) => { 

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);
    todoInput.value = "";
    todoInput.focus();
}  
    // Olculta formulários
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}
    //edita 
const updateTodo = (editInputValue) => {

    const todos = document.querySelectorAll(".todo")
    
    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

            //procura o todo e adiciona o novo texto
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = editInputValue
        }
        
    });
}



// EVENTOS DO FORMULARIO
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value 

    if (inputValue) {
        saveTodo(inputValue)
    } 
});

document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")){

        parentEl.classList.toggle("done") //adiciona na classe done/remove as tarefas finalizadas.
    }

    if (targetEl.classList.contains("edit-todo")){
        toggleForms(); // limpa o form
        
        // salva o valor anterioe e salva depois o valor novo
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }


    if (targetEl.classList.contains("remove-todo")){
        parentEl.remove() // remove a tarefa da lista
    }

});

    // botão de cancelar edição da tarefa
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms();
})