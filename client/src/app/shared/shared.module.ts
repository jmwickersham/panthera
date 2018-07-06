import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
