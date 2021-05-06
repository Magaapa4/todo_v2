const createTodo = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const todoInutEnter = document.querySelector('.todo__input');

// Эксперемантальный блок сделланых дел;
const todoCompleted = document.querySelector('.todo__listCom');

let counterTodo = document.querySelector('.counter');
let num = 0;

createTodo.addEventListener('click', newTodo);

todoInutEnter.addEventListener('keyup', (i) => {
    
    if(i.keyCode == 13) newTodo();

})

function newTodo() {
    
    const todoValue = document.querySelector('.todo__input').value;
    
    if (todoValue === '') return;
    
    const itemTodo = document.createElement('div');

    const todoText = document.createElement('input');
    todoText.setAttribute('data-key', Date.now());

    const wrapperButtons = document.createElement('div');
    const editTodo = document.createElement('button');
    const deleteTodo = document.createElement('button');

    itemTodo.classList.add('todo__item');
    todoText.readOnly = true;
    todoText.value = todoValue;
    
    todoText.classList.add('todo__text');

    editTodo.classList.add('todoEdit');
    deleteTodo.classList.add('todoEdit');

    editTodo.textContent = 'Редактировать';
    deleteTodo.textContent = 'Удалить';
    
    todoList.appendChild(itemTodo);
    itemTodo.appendChild(todoText);
    itemTodo.appendChild(wrapperButtons);
    wrapperButtons.appendChild(editTodo);
    wrapperButtons.appendChild(deleteTodo);
    
    clearInputTodo();

    ++num;
    counterTodo.textContent = `Сегодня дел ${num}`;

    deleteTodo.addEventListener('click', () => {
        
        itemTodo.remove();
        
        const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoText.dataset.key);

        if(completedTodoIndex !== -1) {    
            todoCompleted.children[completedTodoIndex].remove();
        } else {
            --num;
        }

        counterTodo.textContent = `Сегодня дел ${num}`;

        if (num === 0) counterTodo.textContent = '';
        
        
    });

    const save = document.createElement('button');
    const noSave = document.createElement('button');
    
    editTodo.addEventListener('click', () => {
        
        todoText.readOnly = false;
        todoText.classList.add('todo__edit');

        save.textContent = 'сохранить';
        noSave.textContent = 'Отмена';
        
        save.classList.add('todoSave');
        noSave.classList.add('todoNoSave');

        wrapperButtons.appendChild(save);
        wrapperButtons.appendChild(noSave);

        editTodo.remove();
        deleteTodo.remove();
    });
    
    let prevTodoText = todoText.value;
    
    save.addEventListener('click', () => {
        
        const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoText.dataset.key);
            
        if(completedTodoIndex !== -1) {    
            todoCompleted.children[completedTodoIndex].textContent = todoText.value;
        }

        prevTodoText = todoText.value;
        
        todoText.readOnly = true;
        todoText.classList.remove('todo__edit');
        todoText.classList.add('todo__text');
        
        save.remove();
        noSave.remove();

        wrapperButtons.appendChild(editTodo);
        wrapperButtons.appendChild(deleteTodo);
    });
    
    noSave.addEventListener('click', () => {
        
        todoText.value = prevTodoText;
        todoText.readOnly = true;
        todoText.classList.remove('todo__edit');
        todoText.classList.add('todo__text');

        save.remove();
        noSave.remove();
        wrapperButtons.appendChild(editTodo);
        wrapperButtons.appendChild(deleteTodo);
    });

    // let todoTextClone = todoText.cloneNode(true);
    // let todoTextClone = document.createElement('div');
    //! поменять todoTextClone на newCompletedTodo
    todoText.addEventListener('click', (event) => {
        if(todoText.readOnly) {
            
            
            todoText.blur();
            todoText.classList.toggle('test');
            
            let todoTextClone = document.createElement('div');
            todoTextClone.setAttribute('data-key', todoText.dataset.key);
            todoTextClone.textContent = todoText.value;
            todoTextClone.classList.add('todo__listComItem') ;
            
            const completedTodoIndex = Array.from(todoCompleted.children).findIndex( item => item.dataset.key === todoText.dataset.key);
            

            if(completedTodoIndex !== -1) {
                todoCompleted.children[completedTodoIndex].remove();
                ++num;
                counterTodo.textContent = `Сегодня дел ${num}`; 
            } else {

                --num;
                if (!num)  {
                    counterTodo.textContent = '';
                } else {
                    counterTodo.textContent = `Сегодня дел ${num}`; 
                }               
                todoCompleted.appendChild(todoTextClone);
            }
        }
    });
}

function clearInputTodo() {
    document.querySelector('.todo__input').value = '';
}