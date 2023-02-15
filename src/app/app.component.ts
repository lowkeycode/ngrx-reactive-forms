import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, UntypedFormControl, UntypedFormArray } from '@angular/forms';

import * as TodosActions from './store/todos/todo.actions'
import { selectAllTodos } from './store/todos/todo.selectors'

import { Store } from '@ngrx/store';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Todo } from './models/models';
import { AppState } from './store/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subs = new Subscription();

  faEllipsisH = faEllipsisH;
  faXmark = faXmark;
  faCheck = faCheck;

  public allTodos$ = this.store.select(selectAllTodos);
  form!: UntypedFormGroup;
  editingForm!: UntypedFormGroup;


  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      todo: new UntypedFormControl({ value: null, disabled: false})
    });

    const todoFormInit = this.allTodos$.subscribe(todos => {
      this.editingForm = this.fb.group({
        inputs: this.fb.array(todos.map(() => (this.fb.group({
          content: [],
        }))))
      });
    })
    
    this._subs.add(todoFormInit);
    this.store.dispatch(TodosActions.loadTodos());
  }

  ngOnDestroy(): void {
      this._subs.unsubscribe();
  }

  get todo() {
    return this.form.get('todo')
  }

  get editInputs() {
    return this.editingForm.get('inputs') as UntypedFormArray;
  }

  addTodo() {
    const todo = this.todo?.value;
    console.log(todo);
    
    this.store.dispatch(TodosActions.createTodo({ content: todo }))
  }

  deleteEditInput(i: number) {
    this.editInputs.removeAt(i);
  }

  editTodo(todo: Todo) {
    this.store.dispatch(TodosActions.editTodo({ id: todo.id }))
  }

  saveTodo(todo: Todo, i: number) {
    const todoInput = this.editInputs.at(i).get('content')?.value;
    
    this.store.dispatch(TodosActions.saveTodo({ content: todoInput, id: todo.id }))
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(TodosActions.deleteTodo({ id: todo.id }))
  }

}
