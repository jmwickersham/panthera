import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotifyComponent } from './spotify.component';

import { SpotifyService } from './spotify.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpotifyComponent
  ],
  providers: [
    SpotifyService
  ]
})
export class SpotifyModule { }
