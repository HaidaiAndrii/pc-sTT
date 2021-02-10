import { Injectable } from '@angular/core';

//import { Injectable } from '@angular/core'

export interface Todo {
  id: number
  title: string
  completed: boolean
  date?: any
}

@Injectable({providedIn: 'root'})

export class TodoService {
   public todos: Todo[] = [
    {id: 1, title: 'title', completed: false, date: new Date()},
    {id: 2, title: 'itle', completed: true, date: new Date()},
    {id: 3, title: 'itle', completed: false, date: new Date()}
  ];

  onToggle(id: number) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos[index].completed = !this.todos[index].completed;
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
}

}