import { Model } from './model';

export class Modifier extends Model {
  public modifierType: string;
  public displayName: string;
  public team = 0;
  public announced = 0;
  public contraFactor = 1;
  public isActive = false;

  public static init(entity: any): Modifier {
    return new this(entity);
  }
}

export class GameList extends Model {
  data: Array<Modifier>;

  constructor(data: any) {
    super(data);
    super.mapToObjects('data', GameList);
  }
}
