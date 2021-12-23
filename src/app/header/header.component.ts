import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticateService } from '../auth/authenticate.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isAuthenticate = false;

  constructor(private dataStorageService: DataStorageService, private authenticateService: AuthenticateService){}

  ngOnInit(){
    this.authenticateService.user.subscribe(user => {
      this.isAuthenticate = !user ? false : true;
    });
  }

  onClickSave(){
    this.dataStorageService.storeRecipe();
  }

  onClickFetch(){
    this.dataStorageService.fetchRecipe().subscribe();
  }

  onClickLogout(){
    this.authenticateService.logout();
  }

}
