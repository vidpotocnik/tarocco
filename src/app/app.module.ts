import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { AddRecordComponent } from './components/elements/add-record/add-record.component';
import { AddGameComponent } from './components/elements/add-game/add-game.component';
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
    AddRecordComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
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
