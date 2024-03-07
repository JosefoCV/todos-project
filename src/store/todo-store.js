import { Todo } from "../todo/models/todo-mode"

export const filters  = {
    All : 'all',
    Completed : 'Completed',
    Pending : 'Pending'
}


const state = {
    todos : [
        new Todo('Piedra del infinito'),
        new Todo('Piedra del alma'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],

    filters : filters.All,
}

const initStore = () =>{
    loadstore();
    console.log('InitStore =V');
}

const loadstore = ( )=>{
    if(!localStorage.getItem('state'))return;

    const {todos = [], filter = filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos= todos;
    state.filters=filter
}

const saveStateLocalStorage = ()=>{
    localStorage.setItem('state',JSON.stringify(state))
}

const getTodo = (filter = filters.All) => {
    switch(filter){
        case filters.All:
            return [...state.todos];
        case filters.Completed:
            return state.todos.filter(todo => todo.done);
        case filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error(`Option ${ filter } is not valid.`);
    }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {

    if(!description) throw new Error('Description is required');

    state.todos.push(new Todo(description));
    saveStateLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if(todo.id == todoId){
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateLocalStorage();

}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter( todo => todo.id !== todoId);
    saveStateLocalStorage();

}

const deleteCompleted = () => {
    state.todos = state.todos.filter( todo => !todo.done);
    saveStateLocalStorage();

}

/**
 * 
 * @param {filters} newFilter 
 */
const setFilters = (newFilter = filters.All) => {
    state.filters = newFilter;
    saveStateLocalStorage();
}

const getCurrentFilter = () =>{ 
    return state.filters;
}
export default{
    initStore,
    loadstore,
    addTodo,
    toggleTodo,
    getTodo,
    deleteTodo,
    deleteCompleted,
    setFilters,
    getCurrentFilter,
    
}