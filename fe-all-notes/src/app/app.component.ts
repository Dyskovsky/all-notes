import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'dk-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fe-all-notes';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();
  }
}
