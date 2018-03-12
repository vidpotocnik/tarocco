import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../../core/services/game.service';
import { Game } from '../../../../core/models/game';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public gameService: GameService,
    ) { }

  ngOnInit() {
  }

  public selectGame(game: Game) {
    this.gameService.currentGame = game;
  }
}
