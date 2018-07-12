import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotifyComponent } from './spotify.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpotifyComponent
  ],
  exports: [
    SpotifyComponent
  ],
  providers: [
  
  ]
})
export class SpotifyModule { }
