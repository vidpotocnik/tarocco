import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../../../../core/services/game.service';
import { Game } from '../../../../core/models/game';
import { DropDownService } from '../../../../core/services/render/dropdown.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() gameChanged = new EventEmitter();

  constructor(public gameService: GameService,
              public dropDownService: DropDownService) {
  }

  ngOnInit() {
  }

  public selectGame(game: Game) {
    this.gameService.setCurrentGame(game);
    this.dropDownService.toggle('games');
    this.gameChanged.next();
  }
}
