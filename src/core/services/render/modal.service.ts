import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  // Logout modal toggle property
  public gameRecord: boolean;
  public newGame: boolean;
  public removeRound: boolean;

  public open(entity: string) {
    switch (entity) {
      case 'gameRecord': {
        this.gameRecord = true;
        break;
      }
      case 'newGame': {
        this.newGame = true;
        break;
      }
      case 'removeRound': {
        this.removeRound = true;
        break;
      }
    }
  }

  public close(entity: string) {
    switch (entity) {
      case 'gameRecord': {
        this.gameRecord = false;
        break;
      }
      case 'newGame': {
        this.newGame = false;
        break;
      }
      case 'removeRound': {
        this.removeRound = false;
        break;
      }
    }
  }
}
