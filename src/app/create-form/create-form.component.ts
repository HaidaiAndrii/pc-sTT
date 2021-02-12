import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  title ='';
  user = 'user1';
  users = ['user1', 'user2'];

  constructor(public todosService: TodoService) { }

  ngOnInit(): void {
  }

  public addToList() {
    const todo: Todo = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: new Date(),
      user: this.user,
    }

    if (this.todosService.userLogined.name !== todo.user) {
      todo.class = 'someones';
    } else {
      todo.class = 'my';
    }

    //this.todosService.addTodo(todo);
    this.todosService.createTicket(todo).subscribe(data => console.log(data));

    this.cansel();
  }

  cansel() {
    this.title='';
    this.user='user1';
  }
}
