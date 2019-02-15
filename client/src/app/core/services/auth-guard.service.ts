import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private oauthService: OAuthService
  ) { }

  canActivate() {
    //   if (!this.auth.isLoggedIn()) {
    //     this.router.navigateByUrl('/');
    //     return false;
    //   }
    //   return true;
    // }
    if (this.oauthService.hasValidIdToken()) {
      console.log('auth confirmed');
      return true;
    }

    console.log('not confirmed');
    this.router.navigate(['/landing']);
    return false;
  }
}
