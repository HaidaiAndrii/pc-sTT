import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todos.service';
//import * as EventEmitter from 'events';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  constructor(public todosService: TodoService) { }
  
  ngOnInit(): void {
  }
  
  onChange(id: number) {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }
}
