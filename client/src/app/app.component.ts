import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Panthera';

  constructor(
    private router: Router,
    public auth: AuthenticationService
  ) { }

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
}
