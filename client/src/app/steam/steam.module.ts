import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SteamComponent } from './steam.component';

import { SteamService } from './steam.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SteamComponent
  ],
  providers: [
    SteamService
  ]
})
export class SteamModule { }
