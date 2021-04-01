import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { empty, identity, Observable } from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { promise } from 'protractor';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {
constructor(private todoService: TodoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url === '/ticket') {
     this.todoService.addTodo(req.body.todo);
    }

    if (req.method === 'POST' && req.url === '/login') {
        this.todoService.setLoginUser(req.body.user);
      }

    if (req.method === 'GET') {
       this.todoService.getUserTickets(this.todoService.userLogined.id);
    }

    if (req.method === 'PUT') {
      this.todoService.onToggle(req.body.ticketId);
    }

    if (req.method === 'DELETE') {
      const id = req.url.split('/');
      this.todoService.removeTodo(+id[id.length - 1]);
    }

    return Observable.create(empty);
  }
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date?: any;
  user: string;
  class?: string;
}

export interface User {
  id: number;
  name: string;
  pass: string;
}

@Injectable({providedIn: 'root'})

export class TodoService {
  public todos: Todo[] = JSON.parse(localStorage.getItem('all-todos'));
  loginError = false;
  isLogined = false;
  userLogined: User = {id: 0, name: '', pass: ''};
  isLoginedAdmin = false;

  constructor(private http: HttpClient) {}

  createTicket(todo: Todo): any{
    return this.http.post('/ticket', {user: this.userLogined.id, todo: todo});
  }

  getTickets(id: number): any {
    return this.http.get(`/tickets/${id}`);
  }

  login(user: object): any {
    return this.http.post('/login', {user: user});
  }

  checkTicket(todoId: number): any {
    return this.http.put('/ticket', {userId: this.userLogined.id, ticketId: todoId});
  }

  delTicket(userId: number, ticketId: number): any {
    return this.http.delete(`/ticket/${userId}/${ticketId}`);
  }

  onToggle(id: number): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos[index].completed = !this.todos[index].completed;
    localStorage.setItem('all-todos', JSON.stringify(this.todos));
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    localStorage.setItem('all-todos', JSON.stringify(this.todos));
    if (this.userLogined.name !== 'admin') {
      this.todos = this.filter();
    }
  }

  addTodo(todo: Todo): void {
    this.todos = JSON.parse(localStorage.getItem('all-todos'));
    this.todos.push(todo);
    localStorage.setItem('all-todos', JSON.stringify(this.todos));
    if (this.userLogined.name !== 'admin') {
      this.todos = this.filter();
    }
  }

  public filter(): Todo[] {
    return this.todos.filter(todo => todo.user === this.userLogined.name);
  }

  public setLoginUser(logUser: any): void {
    const users = JSON.parse(localStorage.getItem('tt-users'));
    users.map( user => {
      if (user.name === logUser.name && user.pass === logUser.name) {
        this.isLogined = true;
        this.userLogined = user;
        this.getTickets(user.id)
          .subscribe(data => data, error => (error = error.message));
        this.loginError = false;
        if (logUser.name === 'admin') {
          this.isLoginedAdmin = true;
        }
      }

      this.loginError = true;
    });
  }

  public getUserTickets(id: number): void {
    const users = JSON.parse(localStorage.getItem('tt-users'));
    const user = users.find(usr => usr.id === id);
    if (this.todos && user.name !== 'admin') {
      this.todos = this.todos.filter(todo => todo.user === user.name);
    }
  }
}
