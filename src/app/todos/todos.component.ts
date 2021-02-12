import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  constructor(public todosService: TodoService) { }
  
  ngOnInit(): void {
    //localStorage.removeItem('all-todos');
    //console.log('todos form is created')
  }
  
  onChange(id: number) {
    //this.todosService.onToggle(id);
    this.todosService.checkTicket(id).subscribe(data => console.log(data));
  }

  removeTodo(id: number) {
    //this.todosService.removeTodo(id);
    this.todosService.delTicket( this.todosService.userLogined.id, id).subscribe(data => data);
  }
}
