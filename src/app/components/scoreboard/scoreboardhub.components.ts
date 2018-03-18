import { HubConnection } from '@aspnet/signalr'
import { environment } from '../../../environments/environment';

export class ScoreboardHub  {

  uri = environment.baseUri + 'hub/scoreboard';
  conn: HubConnection
  gameId:string;

constructor(gameId) {
  this.conn = new HubConnection(this.uri + '?gameId=' + gameId); 
  this.gameId = gameId;
}

  public async StartHub() {
    if(this.conn)
      await this.conn.start().catch(e => console.log(e));    
    
    this.conn.onclose(e =>  {console.log('onclose:' + e)});
  }

  public onUpdateScoreBoard(handler){
    this.conn.on('updateScoreBoard', handler)
  }

  public changeGame(gameId){
    this.conn.stop();
    this.conn = new HubConnection(this.uri + '?gameId=' + gameId); 
    this.gameId = gameId;
  }
}
