import { Injectable } from '@angular/core';

@Injectable()
export class DropDownService {
  public gameMenu: boolean;
  public games: boolean;

  public toggle(entity: string) {
    switch (entity) {
      case 'gameMenu': {
        this.gameMenu = !this.gameMenu;
        break;
      }
      case 'games': {
        this.games = !this.games;
        break;
      }
    }
  }
}
