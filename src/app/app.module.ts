import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
/**
 * Components
 */
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GameMenuComponent } from './components/elements/game-menu/game-menu.component';
import { GameRecordComponent } from './components/elements/game-record/game-record.component';
/**
 * Services
 */
import { DropDownService } from '../core/services/render/dropdown.service';
import { ScoreBoardService } from '../core/services/score-board.service';
import { ModalService } from '../core/services/render/modal.service';
import { HttpService } from '../core/services/http.service';
import { GameService } from '../core/services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    StatisticsComponent,
    GameMenuComponent,
    GameRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DropDownService,
    ModalService,
    ScoreBoardService,
    GameService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
