import { Component, Input } from '@angular/core';
import { Observable } from 'windowed-observable';

const tpsAuthServiceLoaded$ = new Observable('tpsAuthServiceLoaded');// move to service
declare let seeProfileRedirect : any; // move to service


@Component({
  selector: 'tps-auth-poc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
@Input() userData: any;

  constructor() {
    //authService.subscribeToTpsAuthServiceLoaded(this.getUser);
    this.subscribeToTpsAuthServiceLoaded(this.getUser); // move to service
  }
 

  getUser(){
    seeProfileRedirect().then((response:any)=>{
      this.userData =  response;
    });
    console.log("Success HEADER USER DATA : " , this.userData.account.name)
  }


  subscribeToTpsAuthServiceLoaded(callback:any){// move to service
    tpsAuthServiceLoaded$.subscribe((eventMessage:any) => {
      if(eventMessage === 'Success'){
        callback();
      }
      console.log('Header Script Load : ',eventMessage)
    })
  }


}
