import { Injectable } from '@angular/core';

@Injectable()
export class DropDownService {
  public gameMenu: boolean;

  public toggle(entity: string) {
    switch (entity) {
      case 'gameMenu': {
        this.gameMenu = !this.gameMenu;
        break;
      }
    }
    console.log(this.gameMenu);
  }
}
