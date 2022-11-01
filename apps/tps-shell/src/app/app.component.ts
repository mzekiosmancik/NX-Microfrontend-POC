import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'windowed-observable';

const observable = new Observable('tpsAuthServiceLoaded');
declare let tpsAuthService: any;

@Component({
  selector: 'tps-auth-poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    const msal = this.renderer.createElement('script');
    msal.src = `https://alcdn.msauth.net/browser/2.22.1/js/msal-browser.min.js`;
    msal.onload = () => {
      const script = this.renderer.createElement('script');
      script.src = `http://localhost:4299/tps-auth.service.js`;
      script.onload = () => {
        console.log(script);
        tpsAuthService.init().then(() =>{
          console.log('INIT THEN SUCCESS');
          observable.publish('Success');
        } , (error:any) =>{
          console.log(error);
        });
      }
      this.renderer.appendChild(document.head, script);
      console.log('APPCOMPONENT | CONSTRUCTOR INIT');
    }
    this.renderer.appendChild(document.head, msal);
   
  }

  ngOnInit() {
   

  }

  onUserClickedLogin() {
    
    tpsAuthService.login();
  }
}