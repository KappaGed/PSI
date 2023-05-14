import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchbarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SearchbarComponent
  ]
})
export class SharedModule { }
