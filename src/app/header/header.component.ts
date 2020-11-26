import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  constructor(private dataStorageService: DataStorageService,private authService: AuthService) { }

  isAuthenticated = false;
  private userSub: Subscription;

  //@Output() featureSelected = new EventEmitter<string>();
  // tslint:disable-next-line:typedef
  /*onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; //!user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
