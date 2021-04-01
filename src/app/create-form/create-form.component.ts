import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})

export class CreateFormComponent implements OnInit {
  title = '';
  user = 'user1';
  users = ['user1', 'user2'];
  titleError = false;

  constructor(public todosService: TodoService) { }

  ngOnInit(): void {
  }

  public addToList(): void {
    const todo: Todo = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: new Date(),
      user: this.user,
    };

    if (this.todosService.userLogined.name !== todo.user) {
      todo.class = 'someones';
    } else {
      todo.class = 'my';
    }

    if (this.title.length > 0) {
      this.todosService.createTicket(todo)
        .subscribe(data => data, error => (error = error.message));
      this.titleError = false;
    } else {
      this.titleError = true;
    }

    this.cansel();
  }

  cansel(): void {
    this.title = '';
    this.user = 'user1';
  }
}
