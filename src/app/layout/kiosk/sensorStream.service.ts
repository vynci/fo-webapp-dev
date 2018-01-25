import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SensorStreamService {
  private url = 'http://172.24.1.1:4444';
  private socket;
  
  sendMessage(message){
    this.socket.emit('hardware-command', message);    
    return true;
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('fromPublicServer/data/', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}