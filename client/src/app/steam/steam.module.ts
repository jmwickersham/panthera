import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SteamComponent } from './steam.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SteamComponent
  ],
  exports: [
    SteamComponent
  ],
  providers: [
  ]
})
export class SteamModule { }
