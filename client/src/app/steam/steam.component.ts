import { Component, OnInit } from '@angular/core';

import { SteamService } from './steam.service';

@Component({
  selector: 'app-steam',
  templateUrl: './steam.component.html',
  styleUrls: ['./steam.component.css']
})
export class SteamComponent implements OnInit {
  steamUser: {};
  steamGames: {};
  steamRecentGames: {};
  status: string;
  displayCard: boolean;

  constructor(private steamService: SteamService) { }

  ngOnInit() {
    this.getUser();
    this.getOwnedGames();
    this.getRecentGames();
  }

  getUser(): void {
    this.steamService.getUser()
      .subscribe(steamUser => {
        switch(steamUser[0].personastate) {
          case 1:
            this.status = 'Online';
            this.displayCard = true;
            break;
          case 2:
            this.status = 'Busy';
            this.displayCard = true;
            break;
          case 3:
            this.status = 'Away';
            this.displayCard = true;
            break;
          case 4: 
            this.status = 'Snooze';
            this.displayCard = true;
            break;
          case 5:
            this.status = 'Looking to Trade';
            this.displayCard = true;
            break;
          case 6: 
            this.status = 'Looking to Play';
            this.displayCard = true;
            break;
          case 'error':
            this.status = 'Error';
            this.displayCard = false;
            break;
          default:
            this.status = 'Offline'
            this.displayCard = true;
        }
        this.steamUser = steamUser[0]
      });
  }

  getOwnedGames(): void {
    this.steamService.getOwnedGames()
      .subscribe(steamGames => {
        this.steamGames = steamGames;
      });
  }

  getRecentGames(): void {
    this.steamService.getRecentGames()
      .subscribe(steamRecentGames => {
        this.steamRecentGames = steamRecentGames;
      });
  }
}
