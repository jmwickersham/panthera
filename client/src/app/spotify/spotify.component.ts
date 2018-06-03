import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../services/integrations/spotify.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {
  spotifyUser: {};
  spotifyAuth: {};
  // twitchStream: {};
  // currentlyStreaming: boolean;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.auth();
    // this.getUser();
    // this.getStream();
  }

  auth(): void {
    this.spotifyService.authorize()
    .subscribe(spotifyAuth => {
      console.log(spotifyAuth);
      this.spotifyAuth = spotifyAuth;
    })
  }

  // getUser(): void {
  //   this.twitchService.getUser()
  //     .subscribe(twitchUsers => {
  //       this.twitchUser = twitchUsers[0]
  //     });
  // }

  // getStream(): void {
  //   this.twitchService.getStream()
  //     .subscribe(twitchStreams => {
  //       if (twitchStreams.length != 0) {
  //         this.currentlyStreaming = true;
  //       }
  //       else {
  //         this.currentlyStreaming = false;
  //       }
  //       this.twitchStream = twitchStreams[0];
  //     });
  // }
}
