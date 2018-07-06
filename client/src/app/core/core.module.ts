import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { MessagesComponent } from './messages.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessagesComponent
  ],
  exports: [
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    MessageService
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
