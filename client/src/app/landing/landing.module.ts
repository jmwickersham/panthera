import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing.component';

import { BattlenetModule } from '../battlenet/battlenet.module';
import { SpotifyModule } from '../spotify/spotify.module';
import { SteamModule } from '../steam/steam.module';
import { TwitchModule } from '../twitch/twitch.module';

import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BattlenetModule,
    SpotifyModule,
    SteamModule,
    TwitchModule,
    LandingRoutingModule
  ],
  declarations: [
    LandingComponent
  ]
})
export class LandingModule { }
