import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tps-auth-poc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userDataStorage : any;
   
   constructor() {}
 
  ngOnInit(): void {
    this.userDataStorage = this.allLocalStorage()[0];
  }

  allLocalStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }
    return values;
  }
}
