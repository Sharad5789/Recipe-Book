import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './auth/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Project';

  constructor(private authenticateService: AuthenticateService){}

  ngOnInit(){
    this.authenticateService.autoLogin();
  }
}
