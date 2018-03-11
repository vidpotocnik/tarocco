import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastyModule } from 'ng2-toasty';
/**
 * Components
 */
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GameMenuComponent } from './components/elements/game-menu/game-menu.component';
import { AddRecordComponent } from './components/elements/add-record/add-record.component';
import { AddGameComponent } from './components/elements/add-game/add-game.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { RemoveRoundComponent } from './components/scoreboard/remove-round/remove-round.component';
/**
 * Services
 */
import { DropDownService } from '../core/services/render/dropdown.service';
import { ScoreBoardService } from '../core/services/score-board.service';
import { ModalService } from '../core/services/render/modal.service';
import { HttpService } from '../core/services/http.service';
import { GameService } from '../core/services/game.service';
import { ToastService } from '../core/services/render/toast.service';
import { StepperService } from '../core/services/render/stepper.service';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    StatisticsComponent,
    GameMenuComponent,
    AddRecordComponent,
    AddGameComponent,
    RemoveRoundComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastyModule
  ],
  providers: [
    DropDownService,
    ModalService,
    ScoreBoardService,
    GameService,
    HttpService,
    ToastService,
    StepperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
