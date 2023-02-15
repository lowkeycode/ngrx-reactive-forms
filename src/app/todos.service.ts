import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Todo } from "./models/models";
import { todoList } from "./models/stubs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private state$ = new BehaviorSubject<Todo[]>(todoList)
  todoList$ = this.state$.asObservable();

  getTodos(): Observable<Todo[]> {
    return this.todoList$;
  }
}