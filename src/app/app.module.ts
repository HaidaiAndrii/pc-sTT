import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { FormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';
import { HttpClientModule }   from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {reqInterceptor} from './shared/todos.service';
import { TodosFilterPipe } from './shared/todos-filter.pipe';
import { DoneTodosFilterPipe } from './shared/todos-filter.pipe';
import { PlannedTodosFilterPipe } from './shared/todos-filter.pipe';
import { MyTodosFilterPipe } from './shared/todos-filter.pipe';
import { AnotherTodosFilterPipe } from './shared/todos-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodosComponent,
    CreateFormComponent,
    TodosFilterPipe,
    DoneTodosFilterPipe,
    PlannedTodosFilterPipe,
    MyTodosFilterPipe,
    AnotherTodosFilterPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: reqInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
