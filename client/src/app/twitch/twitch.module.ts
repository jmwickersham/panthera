import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwitchComponent } from './twitch.component';

import { TwitchService } from './twitch.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TwitchComponent
  ],
  providers: [
    TwitchService
  ]
})
export class TwitchModule { }
