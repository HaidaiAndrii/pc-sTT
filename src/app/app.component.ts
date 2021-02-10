import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = this.show();
  old = '';
  
  public show() {
    console.log('start');
    this.old = localStorage.getItem('us');
    //localStorage.setItem('us', this.old + [5].toString());
    console.log('Success');
    return localStorage.getItem('us');
  }

}

