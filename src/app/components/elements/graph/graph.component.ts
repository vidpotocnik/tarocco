/**
 * Internal
 */
import { Component, Input, OnChanges, OnInit } from '@angular/core';
/**
 * Models
 */
import { GameStatistics } from '../../../../core/models/game-statistics';
import { Result } from '../../../../core/models/result';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() statistics: Array<GameStatistics>;
  @Input() type = 'line';
  @Input() graph = 'AVGP';

  result: Array<Result>;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.initData();
  }

  private initData(): void {
    switch (this.graph) {
      case 'passive': {
        this.initCountPrikolica();
        break;
      }
      case 'active': {
        this.initCountLead();
        break;
      }
      default: {
        this.initAveragePerRound();
        break;
      }
    }
  }

  private initAveragePerRound(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.averagePerRound}));
    });
  }

  private initCountPrikolica(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.countPrikolica}));
    });
  }

  private initCountLead(): void {
    if (!this.statistics) {
      return;
    }
    this.result = [];
    this.statistics.forEach((s) => {
      this.result.push(new Result({name: s.name, value: s.countLead}));
    });
  }

}
