import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../core/models/menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menu: Array<MenuItem>;

  constructor() {
    this.initMenu();
  }

  ngOnInit() {
  }

  public setActive(link: any): void {
    this.menu.forEach((item) => {
      item.list.forEach((l) => {
        l.isActive = l.label === link.label;
      });

    });
  }

  private initMenu(): void {
    this.menu = [
      MenuItem.init({
        label: 'Osnovno',
        list: [{label: 'Login', isActive: false, link: ['login']}, {label: 'Registracija ekipe', isActive: false, link: ['']}]
      }),
      MenuItem.init({
        label: 'Administracija',
        list: [{label: 'Člani ekipe', isActive: false, link: ['']}, {label: 'Dostopna koda', isActive: false, link: ['']}]
      }),
      MenuItem.init({
        label: 'Igre',
        list: [{label: 'Scoreboard', isActive: false, link: ['']}, {label: 'Statistika', isActive: false, link: ['']}]
      })
    ];
  }
}
