import { Component, OnInit } from '@angular/core';
import { GameService } from '../core/services/game.service';
import { HttpService } from '../core/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private httpService: HttpService) {}

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

  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
  }
}
