const createTodo = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const todoInputEnter = document.querySelector('.todo__input');
const todoCompleted = document.querySelector('.todo__listCom');

let counterTodoBlock = document.querySelector('.counter');
let todosCount = 0;

createTodo.addEventListener('click', newTodo);

todoInputEnter.addEventListener('keyup', (i) => { 
    if(i.keyCode == 13) newTodo();
})

function newTodo() {   
    const todoValue = document.querySelector('.todo__input').value;
    
    if (todoValue.trim() === '') return;
    
    const itemTodo = document.createElement('div');

    const todoNameInput = document.createElement('input');
    todoNameInput.setAttribute('data-key', Date.now());

    const wrapperButtons = document.createElement('div');
    const editTodo = document.createElement('button');
    const deleteTodo = document.createElement('button');

    itemTodo.classList.add('todo__item');
    todoNameInput.readOnly = true;
    todoNameInput.value = todoValue.trim();

    todoNameInput.classList.add('todo__text');

    editTodo.classList.add('todoEdit');
    deleteTodo.classList.add('todoEdit');

    editTodo.textContent = 'Редактировать';
    deleteTodo.textContent = 'Удалить';
    
    todoList.appendChild(itemTodo);
    itemTodo.appendChild(todoNameInput);
    itemTodo.appendChild(wrapperButtons);
    wrapperButtons.appendChild(editTodo);
    wrapperButtons.appendChild(deleteTodo);
    
    clearInputTodo();

    ++todosCount;
    counterTodoBlock.textContent = `Сегодня дел ${todosCount}`;

    deleteTodo.addEventListener('click', () => {
        
        itemTodo.remove();
        
        const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoNameInput.dataset.key);

        if(completedTodoIndex !== -1) {    
            todoCompleted.children[completedTodoIndex].remove();
        } else {
            --todosCount;
        }

        counterTodoBlock.textContent = `Сегодня дел ${todosCount}`;

        if (todosCount === 0) counterTodoBlock.textContent = '';
            
    });

    const save = document.createElement('button');
    const noSave = document.createElement('button');
    
    editTodo.addEventListener('click', () => {
        
        todoNameInput.readOnly = false;
        todoNameInput.classList.add('todo__edit');

        save.textContent = 'сохранить';
        noSave.textContent = 'Отмена';
        
        save.classList.add('todoSave');
        noSave.classList.add('todoNoSave');

        wrapperButtons.appendChild(save);
        wrapperButtons.appendChild(noSave);

        editTodo.remove();
        deleteTodo.remove();
    });
    
    let prevTodoNameInput = todoNameInput.value;
    
    save.addEventListener('click', () => {
        
        const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoNameInput.dataset.key);
            
        if(completedTodoIndex !== -1) {    
            todoCompleted.children[completedTodoIndex].textContent = todoNameInput.value;
        }

        prevTodoNameInput = todoNameInput.value;
        
        todoNameInput.readOnly = true;
        todoNameInput.classList.remove('todo__edit');
        todoNameInput.classList.add('todo__text');
        
        save.remove();
        noSave.remove();

        wrapperButtons.appendChild(editTodo);
        wrapperButtons.appendChild(deleteTodo);
    });
    
    noSave.addEventListener('click', () => {
        
        todoNameInput.value = prevTodoNameInput;
        todoNameInput.readOnly = true;
        todoNameInput.classList.remove('todo__edit');
        todoNameInput.classList.add('todo__text');

        save.remove();
        noSave.remove();
        wrapperButtons.appendChild(editTodo);
        wrapperButtons.appendChild(deleteTodo);
    });

    todoNameInput.addEventListener('click', (event) => {
        if(todoNameInput.readOnly) {
            
            todoNameInput.blur();
            todoNameInput.classList.toggle('test');
            
            let newCompletedTodo = document.createElement('div');
            newCompletedTodo.setAttribute('data-key', todoNameInput.dataset.key);
            newCompletedTodo.textContent = todoNameInput.value;
            newCompletedTodo.classList.add('todo__listComItem') ;

            const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoNameInput.dataset.key);
            
            if(completedTodoIndex !== -1) {
                todoCompleted.children[completedTodoIndex].remove();
                ++todosCount;
                counterTodoBlock.textContent = `Сегодня дел ${todosCount}`; 
            } else {

                --todosCount;
                if (!todosCount)  {
                    counterTodoBlock.textContent = '';
                } else {
                    counterTodoBlock.textContent = `Сегодня дел ${todosCount}`; 
                }               
                todoCompleted.appendChild(newCompletedTodo);  
            }
        }
    });
}

function clearInputTodo() {
    document.querySelector('.todo__input').value = '';
}