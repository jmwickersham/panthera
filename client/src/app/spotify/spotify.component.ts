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
  currentlyStreaming: boolean;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.auth();
  }

  auth(): void {
    this.spotifyService.authorize()
    .subscribe(spotifyAuth => {
      console.log(spotifyAuth);
      this.spotifyAuth = spotifyAuth;
    })
  }
}
