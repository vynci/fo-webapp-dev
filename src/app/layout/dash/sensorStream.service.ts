import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SensorStreamService {
  // private url = 'http://172.20.10.9:4444';
  private url = 'http://192.168.1.9:4444';
  // private url = 'http://192.168.43.226:4444';
  private socket;
  
  sendMessage(message){
    this.socket.emit('add-message', message);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('fromPublicServer', (data) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}