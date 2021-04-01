import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = '';
  userPass = '';

  constructor(public todosService: TodoService) {
  }

  ngOnInit(): void {
    this.createUsers();
  }

  public createUsers(): void {
    if (!localStorage.getItem('tt-users')) {
      localStorage.setItem('tt-users', JSON.stringify(
        [
          {id: '0', name: 'admin', pass : 'admin'},
          {id: '1', name: 'user1', pass: 'user1'},
          {id: '2', name: 'user2', pass: 'user2'}
        ]
      ));
    }

    if (!localStorage.getItem('all-todos')) {
      localStorage.setItem('all-todos', JSON.stringify([]));
    }
  }

  public fetchLogin(): void {
    const user = {name: this.userName, pass: this.userPass};
    this.todosService.login(user)
      .subscribe(data => data, error => (error = error.message));
  }
}
