import { Component, OnInit } from '@angular/core';

import { BattlenetService } from './battlenet.service';

@Component({
  selector: 'app-battlenet',
  templateUrl: './battlenet.component.html',
  styleUrls: ['./battlenet.component.css']
})
export class BattlenetComponent implements OnInit {
  bnetWowCharacter: {};
  bnetWowCharacterRenderURL: string;
  bnetWowCharacterTitle: string;
  bnetWowCharacterSpec: string;

  constructor(private battlenetService: BattlenetService) { }

  ngOnInit() {
    this.getWowCharacter();
  }

  getWowCharacter(): void {
    this.battlenetService.getWowCharacter()
    .subscribe(bnetWowCharacter => {
      this.bnetWowCharacter = bnetWowCharacter;
      this.getWowCharacterRenderURL();
      this.getWowCharacterTitle();
      this.getWowCharacterSpec();
    });
  }

  getWowCharacterRenderURL(): void {
    let newThumbnail = this.bnetWowCharacter['thumbnail'].replace('avatar', 'main');
    let renderURL = 'https://render-us.worldofwarcraft.com/character/' + newThumbnail;
    this.bnetWowCharacterRenderURL = renderURL;
  }

  getWowCharacterTitle(): void {
    let titles = this.bnetWowCharacter['titles'];
    let selectedTitle;

    for (let i = 0; i < titles.length; i++) {
      if (titles[i].selected) {
        selectedTitle = titles[i].name;
      }
    }

    let bnetWowCharacterTitle = selectedTitle.replace('%s', this.bnetWowCharacter['name']);
    this.bnetWowCharacterTitle = bnetWowCharacterTitle;
  }

  getWowCharacterSpec(): void {
    let specs = this.bnetWowCharacter['talents'];
    let selectedSpec;

    for (let i = 0; i < specs.length; i++) {
      if (specs[i].selected) {
        selectedSpec = specs[i].spec.name;
      }      
    }

    this.bnetWowCharacterSpec = selectedSpec;
  }
}
