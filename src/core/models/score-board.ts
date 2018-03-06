import {Model} from './model';
import { Round } from './round';

export class ScoreBoard extends Model {
   public contraFactor: number;
   public difference: number;
   public gameId: string;
   public gameType: number;
   public isKlop: boolean;
   public leadPlayerId: string;
   public mondFangPlayerId: string;
   public roundId: string;
   public roundNumber: number;
   public supportingPlayerId: string;
   public won: boolean;
   public roundResults: Array<Round>;


    public static init(entity: any): ScoreBoard {
      return new this(entity);
    }

    public getGameType(): string {
      switch (this.gameType) {
        case 10: {
          return 'III';
        }
        case 20: {
          return 'II';
        }
        case 30: {
          return 'I';
        }
        case 40: {
          return 'SOLO III';
        }
        case 50: {
          return 'SOLO II';
        }
        case 60: {
          return 'SOLO I';
        }
        case 70: {
          return 'BERAČ';
        }
        case 80: {
          return 'ODPRTI BERAČ';
        }
      }
    }
}

export class ScoreBoardList extends Model {
    data: Array<ScoreBoard>;

    constructor(data: any) {
        super(data);
      super.mapToObjects('data', ScoreBoard);
    }
}
