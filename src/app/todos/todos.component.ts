import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(public todosService: TodoService) { }
  searchStr = '';
  isDoneOnly = false;
  isPlannedOnly = false;
  myOnly = false;
  anotherOnly = false;


  ngOnInit(): void {
  }

  onChange(id: number): void {
    this.todosService.checkTicket(id)
      .subscribe(data => data, error => (error = error.message));
  }

  removeTodo(id: number): void {
    this.todosService.delTicket(this.todosService.userLogined.id, id)
      .subscribe(data => data, error => (error = error.message));
  }
}
