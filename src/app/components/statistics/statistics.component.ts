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

  constructor(
    public gameService: GameService,
    private httpService: HttpService) {
  }

  ngOnInit() {
    this.getGames();
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
    console.log(rsp);
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
