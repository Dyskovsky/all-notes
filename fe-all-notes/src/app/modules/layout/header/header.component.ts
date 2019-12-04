import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'dk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(private auth: AuthService) { }

  get loggedIn(): boolean {
    return this.auth.loggedIn;
  }

  login() {
    return this.auth.login();
  }

  logout() {
    return this.auth.logout();
  }

  profile$() {
    return this.auth.userProfile$;
  }

}
