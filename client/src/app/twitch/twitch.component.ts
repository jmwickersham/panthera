import { Component, OnInit } from '@angular/core';

import { TwitchService } from '../services/twitch.service';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit {
  twitchUser: {};
  twitchStream: any[] = [];
  currentlyStreaming: boolean;

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    this.getUser();
    this.getStream();
    this.currentlyStreaming = this.checkStream();
  }

  getUser(): void {
    this.twitchService.getUser()
      .subscribe(twitchUsers => {
        console.log(twitchUsers);
        this.twitchUser = twitchUsers[0]
      });
  }

  getStream(): void {
    this.twitchService.getStream()
      .subscribe(twitchStreams => {
        console.log(twitchStreams);
        this.twitchStream = twitchStreams[0]
      });
  }

  checkStream() {
    console.log(this.twitchStream["length"])
    if (this.twitchStream["length"] != 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
