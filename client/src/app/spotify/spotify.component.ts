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
  spotifyToken: string;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getAPIToken();
    this.getMyInfo(this.spotifyToken);
    this.getMyCurrentlyPlaying(this.spotifyToken);

    // this.interval = setInterval(() => { 
    //     this.getMyCurrentlyPlaying(this.spotifyToken); 
    // }, 30000);
  }

  getAPIToken(): void {
    this.spotifyService.getAPIToken()
    .subscribe(spotifyToken => {
      this.spotifyToken = 'Bearer ' + spotifyToken["access_token"]
      console.log(this.spotifyToken)
    })
  }

  getMyInfo(token): void {
    this.spotifyService.getMyInfo(token)
    .subscribe(mySpotifyInfo => {
      console.log(mySpotifyInfo)
      this.mySpotifyInfo = mySpotifyInfo;
    })
  }
  
  getMyCurrentlyPlaying(token): void {
    this.spotifyService.getMyCurrentlyPlaying(token)
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
