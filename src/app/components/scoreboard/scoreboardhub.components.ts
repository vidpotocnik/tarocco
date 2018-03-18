import { HubConnection } from '@aspnet/signalr'
import { environment } from '../../../environments/environment';

export class ScoreboardHub {

  connection = new HubConnection(environment.baseUri + 'hub/scoreboard');

  constructor() {
    this.connection.onclose(e =>  {console.log('onclose:' + e)});
  
    // this.connection.on('updateScoreBoard', (message) => {
    //   console.log(message);
    // });
  }
  
  public async StartHub() {
    await this.connection.start().catch(e => console.log(e));    
  }

  public onUpdateScoreBoard(handler){
    this.connection.on('updateScoreBoard', handler)
  }
}
