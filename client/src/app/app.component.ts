import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

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
    public auth: AuthenticationService,
    private oauthService: OAuthService
  ) {
    this.oauthService.redirectUri = window.location.origin;
    this.oauthService.clientId = '0oaj86n7vdmBIWzwo0h7';
    this.oauthService.scope = 'openid profile email';
    this.oauthService.issuer = 'https://dev-505068.oktapreview.com/oauth2/default';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

  // logout() {
  //   localStorage.removeItem('jwtToken');
  //   this.router.navigate(['login']);
  // }

  login() {
    this.oauthService.initImplicitFlow();
    //this.givenName();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    debugger;
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
}
