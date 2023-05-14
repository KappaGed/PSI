import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSearchComponent } from '../game-search/game-search.component';
import { GameDetailComponent } from '../game-detail/game-detail.component';
import { GamesComponent } from '../games/games.component';
import { GameService } from '../game.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GamesComponent,
    GameDetailComponent,
    GameSearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    GamesComponent,
    GameSearchComponent,
  ],
  providers: [
    GameService,
  ]
})
export class GameModule { }
