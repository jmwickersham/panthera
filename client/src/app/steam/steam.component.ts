import { Component, OnInit } from '@angular/core';

import { SteamService } from '../services/integrations/steam.service';

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
            break;
          case 2:
            this.status = 'Busy';
            break;
          case 3:
            this.status = 'Away';
            break;
          case 4: 
            this.status = 'Snooze';
            break;
          case 5:
            this.status = 'Looking to Trade';
            break;
          case 6: 
            this.status = 'Looking to Play';
            break;
          default:
            this.status = 'Offline'
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
