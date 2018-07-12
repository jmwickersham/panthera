import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwitchComponent } from './twitch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TwitchComponent
  ],
  exports: [
    TwitchComponent
  ],
  providers: []
})
export class TwitchModule { }
