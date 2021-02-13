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
    //localStorage.removeItem('all-todos');
  }
  
  onChange(id: number) {
    this.todosService.checkTicket(id).subscribe(data => data, error => {error = error.message; console.log(error)});
  }

  removeTodo(id: number) {
    this.todosService.delTicket( this.todosService.userLogined.id, id).subscribe(data => data, error => {error = error.message; console.log(error)});
  }
}
