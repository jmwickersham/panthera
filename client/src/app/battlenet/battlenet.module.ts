import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BattlenetComponent }  from './battlenet.component';

import { BattlenetService }      from './battlenet.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BattlenetComponent
  ],
  providers: [
    BattlenetService
  ]
})
export class BattlenetModule { }
