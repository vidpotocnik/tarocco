/**
 * Internal
 */
import { HubConnection } from '@aspnet/signalr';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';

export class ScoreboardHub {

  connection = new HubConnection(environment.baseUri + 'hub/scoreboard');

  constructor() {
    this.connection.onclose(e => {
      console.log('onclose:' + e);
    });
  }

  public async startHub() {
    await this.connection.start().catch(e => console.log(e));
  }

  public onUpdateScoreBoard(handler): void {
    this.connection.on('updateScoreBoard', handler);
  }
}
