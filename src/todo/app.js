import html from './app.html?raw';
import todoStore, { filters } from '../store/todo-store';
import { renderPending, renderTodos } from './use-cases';


const ElementIDs = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingC: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) =>{ 

    const displayTodos = () =>{
        const todos = todoStore.getTodo( todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () =>{
        renderPending(ElementIDs.PendingC)
    }
    //Cuando la funcion Appp() se llama
    (()=>{

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //referencias HTMl

    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const clearCompleted = document.querySelector(ElementIDs.clearCompleted);
    const TodoUl = document.querySelectorAll(ElementIDs.TodoFilters);

    //listener

    newDescriptionInput.addEventListener('keyup', (event) => {
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().lenght === 0)return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        
        event.target.value ='';
    });

    todoListUl.addEventListener('click',(event)=>{
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
        
    });

    todoListUl.addEventListener('click',(event)=>{
        const isDestroyElement =  event.target.className === 'destroy'
        const element = event.target.closest('[data-id]');
        if(!element || !isDestroyElement) return;
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
        
    })

    clearCompleted.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
        
    })

    TodoUl.forEach(element =>{
        element.addEventListener('click', (element)=>{
            TodoUl.forEach(el => { el.classList.remove('selected')})
            element.target.classList.add('selected');
            
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilters(filters.All)
                    break;
                case 'Pendientes':
                    todoStore.setFilters(filters.Pending)
                    break;
                case 'Completados':
                    todoStore.setFilters(filters.Completed)
                    break;
            }
            displayTodos();
            
        })
    })
}