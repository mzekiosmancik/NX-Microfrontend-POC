import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'tps-auth-poc-workspace-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class RemoteEntryComponent implements OnInit {

  constructor() { 
    console.log('Remote Entry Workspace Const');
  }

  ngOnInit(): void {
    console.log('Remote Entry Workspace init');
  }

}
