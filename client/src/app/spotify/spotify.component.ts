import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/integrations/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  mySpotifyInfo: {};
  mySpotifyCurrentlyPlaying: {};
  currentlyPlaying: boolean;
  interval: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getMyInfo();
    this.getMyCurrentlyPlaying();

    // this.interval = setInterval(() => { 
    //     this.getMyCurrentlyPlaying(); 
    // }, 30000);
  }

  getMyInfo(): void {
    this.spotifyService.getMyInfo()
    .subscribe(mySpotifyInfo => {
      console.log(mySpotifyInfo)
      this.mySpotifyInfo = mySpotifyInfo;
    })
  }
  
  getMyCurrentlyPlaying(): void {
    this.spotifyService.getMyCurrentlyPlaying()
    .subscribe(mySpotifyCurrentlyPlaying => {
      console.log(mySpotifyCurrentlyPlaying)
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
