import { createAction, props } from "@ngrx/store";
import { Todo } from "src/app/models/models";

export const createTodo = createAction('[Todo Page] Add Todo', props<{content: string}>());

export const saveTodo = createAction('[Todo Page] Save Todo', props<{content: string, id: string}>());

export const editTodo = createAction('[Todo Page] Edit Todo', props<{id: string}>())

export const deleteTodo = createAction('[Todo Page] Delete Todo', props<{id: string}>());

export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadSuccessTodos = createAction('[Todo Page] Todo Load Success', props<{todos: Todo[]}>())

export const loadErrorTodos = createAction('[Todo Page] Todo Load Error', props<{error: string}>())