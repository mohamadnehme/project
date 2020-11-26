import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Books';
  loadedFeature = 'recipe';

  // tslint:disable-next-line:typedef
  /*onNavigate(feature: string) {
    this.loadedFeature = feature;
  }*/

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

}
