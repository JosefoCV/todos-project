import todoStore, { filters } from "../../store/todo-store";



let element;

/**
 * 
 * @param {String} elementId 
 */
export const renderPending = (elementId) =>{

    if (!element)
        element = document.querySelector(elementId);
    if(!element)
        throw new Error(`Element ${elementId} not found`);

    element.innerHTML = todoStore.getTodo( filters.Pending ).length;


}