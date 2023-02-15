import { map } from 'rxjs';
import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/models/models"
import * as TodosActions from './todo.actions'

export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: 'pending' | 'loading' | 'success' | 'error'
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  status: 'pending'
}

export const todoReducer = createReducer(
  initialState,

  on(TodosActions.createTodo, (state, { content }) => {
    return {
      ...state,
      todos: [...state.todos, { id: Date.now().toString(), editing: false, content }]
    }
  }),

  on(TodosActions.editTodo, (state, { id }) => {
    return{
      ...state,
      todos: state.todos.map(todo => todo.id === id ? {...todo, editing: true} : todo)
    }
  }),

  on(TodosActions.saveTodo, (state, { content, id }) => {
    return {
      ...state,
      todos: state.todos.map(todo => todo.id === id ? {...todo, content, editing: false} : todo)
    }
  }),

  on(TodosActions.deleteTodo, (state, { id }) => {
    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== id)
    }
  }),

  on(TodosActions.loadTodos, (state) => ({ ...state, status: 'loading' })),

  on(TodosActions.loadSuccessTodos, (state, { todos }) => {
    return {
      ...state,
      todos,
      error: null,
      status: 'success'
    }
  }),

  on(TodosActions.loadErrorTodos, (state, { error }) => ({
    ...state,
    error,
    status: 'error'
  }))
);