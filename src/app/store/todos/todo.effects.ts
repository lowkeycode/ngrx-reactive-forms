import { loadTodos } from './todo.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodoService } from 'src/app/todos.service';
import * as TodoActions from './todo.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() => {
        return this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadSuccessTodos({ todos })),
          catchError((error) => of(TodoActions.loadErrorTodos({ error })))
        );
      })
    );
  });
}
