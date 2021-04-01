import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from './todos.service';

@Pipe ({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], search: string = '' ): Todo[] {

    if (!search.trim()) {
      return todos;
    }

    return todos.filter(todo => {
      return todo.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}

@Pipe({
  name: 'doneTodosFilter'
})
export class DoneTodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], isDoneOnly: boolean = false): Todo[] {

    if (isDoneOnly) {
      return todos.filter(todo => todo.completed === true);
    }

    return todos;
  }
}

@Pipe({
  name: 'plannedTodosFilter'
})
export class PlannedTodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], isPlannedOnly: boolean = false): Todo[] {

    if (isPlannedOnly) {
      return todos.filter(todo => todo.completed === false);
    }

    return todos;
  }
}

@Pipe({
  name: 'myTodosFilter'
})
export class MyTodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], myOnly: boolean = false): Todo[] {

    if (myOnly) {
      return todos.filter(todo => todo.class === 'my');
    }

    return todos;
  }
}

@Pipe({
  name: 'anotherTodosFilter'
})
export class AnotherTodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], anotherOnly: boolean = false): Todo[] {

    if (anotherOnly) {
      return todos.filter(todo => todo.class === 'someones');
    }

    return todos;
  }
}
