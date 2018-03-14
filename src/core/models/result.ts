import {Model} from './model';

export class Result extends Model {
    name: number;
    isKlop: boolean;
    value: string;

    public static init(entity = {}): Result {
      return new this(entity);
    }
}
