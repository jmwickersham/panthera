import { Component, OnInit } from '@angular/core';

import { TwitchService } from './twitch.service';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit {
  twitchUser: {};
  twitchStream: {};
  currentlyStreaming: boolean;

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    this.getUser();
    this.getStream();
  }

  getUser(): void {
    this.twitchService.getUser()
      .subscribe(twitchUsers => {
        this.twitchUser = twitchUsers[0]
      });
  }

  getStream(): void {
    this.twitchService.getStream()
      .subscribe(twitchStream => {
        if (twitchStream.length != 0) {
          this.currentlyStreaming = true;
        }
        else {
          this.currentlyStreaming = false;
        }
        this.twitchStream = twitchStream[0];
      });
  }
}
