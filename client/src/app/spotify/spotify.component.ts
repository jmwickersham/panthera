import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/integrations/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  spotifyUser: {};
  mySpotifyInfo: {};
  mySpotifyCurrentlyPlaying: {};
  currentlyPlaying: boolean;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getMyInfo();
    this.getMyCurrentlyPlaying();
  }

  getMyInfo(): void {
    this.spotifyService.getMyInfo()
    .subscribe(mySpotifyInfo => {
      this.mySpotifyInfo = mySpotifyInfo;
    })
  }
  
  getMyCurrentlyPlaying(): void {
    this.spotifyService.getMyCurrentlyPlaying()
    .subscribe(mySpotifyCurrentlyPlaying => {
      console.log('spotify:', mySpotifyCurrentlyPlaying);
      if (mySpotifyCurrentlyPlaying["is_playing"] == true) {
        this.currentlyPlaying = true;
      }
      else {
        this.currentlyPlaying = false;
      }
      this.mySpotifyCurrentlyPlaying = mySpotifyCurrentlyPlaying;
    })
  }
}
