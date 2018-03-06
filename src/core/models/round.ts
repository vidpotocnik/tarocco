import { Model } from './model';
import { Player } from './player';

export class Round extends Model {
  public roundId: string;
  public GameId: string;
  public playerId: string;
  public playerRadelcCount: number;
  public playerRadelcUsed: number;
  public playerScore: number;
  public player: Player;

  public static init(entity: any): Round {
    return new this(entity);
  }
}

export class RoundList extends Model {
  data: Array<Round>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', Round);
  }
}
