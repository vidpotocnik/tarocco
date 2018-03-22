/**
 * Internal
 */
import { HubConnection } from '@aspnet/signalr';
/**
 * Environment
 */
import { environment } from '../../../environments/environment';

export class ScoreboardHub {

  public conn: HubConnection;
  public gameId: string;

  private uri = environment.baseUri + 'hub/scoreboard';

  constructor(gameId) {
    this.conn = new HubConnection(this.uri + '?gameId=' + gameId);
    this.gameId = gameId;
  }

  public async StartHub() {
    if (this.conn) {
      await this.conn.start().catch(e => console.log(e));
    }

    this.conn.onclose(e => {
      console.log('onclose:' + e);
    });
  }

  public onUpdateScoreBoard(handler) {
    this.conn.on('updateScoreBoard', handler);
  }

  public changeGame(gameId) {
    this.conn.stop();
    this.conn = new HubConnection(this.uri + '?gameId=' + gameId);
    this.gameId = gameId;
  }
}
