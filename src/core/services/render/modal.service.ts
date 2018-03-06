import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  // Logout modal toggle property
  public gameRecord: boolean;

  public open(entity: string) {
    switch (entity) {
      case 'gameRecord': {
        this.gameRecord = true;
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
    }
  }
}
