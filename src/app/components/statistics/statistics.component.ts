import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { GameStatistics } from '../../../core/models/game-statistics';
import { HttpService } from '../../../core/services/http.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public statistics: Array<GameStatistics>;
  public statTabs = [
    {id: 2, name: 'AVG P.P.R', active: true},
    {id: 1, name: 'Prikolica', active: false},
    {id: 3, name: 'Vodilni', active: false},
    {id: 0, name: 'Splošno', active: false}
    ];
  public activeTab: any;

  constructor(
    public gameService: GameService,
    private httpService: HttpService) {
  }

  ngOnInit() {
    this.getGames();
  }

  public setActiveTab(tab): void {
    this.statTabs.forEach((st) => {
      st.active = tab.id === st.id;
    });
    this.activeTab = this.statTabs.find(t => t.active);
  }

  public getGames(): void {
    this.gameService
      .getGames()
      .subscribe(
        entities => this.loadGames(entities),
        error => this.httpService.handleError(error)
      );
  }

  public getGame(gameId: string): void {
    this.gameService
      .getGame(gameId)
      .subscribe(
        entity => this.loadGame(entity),
        error => this.httpService.handleError(error)
      );
  }

  public getStatistics(gameId = this.gameService.currentGame.teamId): void {
    this.gameService
      .getStatistics(gameId)
      .subscribe(
        entities => this.loadStatistics(entities),
        error => this.httpService.handleError(error)
      );
  }

  private loadStatistics(rsp) {
    this.statistics = rsp.data;
  }

  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
    this.gameService.getCurrentGame();
  }

  private loadGame(entity: any): void {
    this.gameService.currentGame = entity.data;
    this.getStatistics();
  }
}
