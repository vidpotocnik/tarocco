import {Model} from './model';

export class Result extends Model {
    name: number;
    value: string;

    public static init(entity = {}): Result {
      return new this(entity);
    }
}
