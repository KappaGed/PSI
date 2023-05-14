import { NgModule, createNgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameModule } from './game/game.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UserModule,
    SharedModule,
    GameModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
