import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MessagesComponent } from './messages.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';

import { LandingModule } from '../landing/landing.module';

@NgModule({
  imports: [
    CommonModule,
    LandingModule,
    HttpClientModule
  ],
  declarations: [
    MessagesComponent
  ],
  exports: [
    MessagesComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
