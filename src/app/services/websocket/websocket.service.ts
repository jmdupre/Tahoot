import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as io from 'socket.io-client';

// export class GameRoom{
//   roomName: string = '';
//   data: any;
// }

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url = 'https://tahoot-frontend.herokuapp.com:3000';
  public socket;

  constructor() { 
    this.socket = io(this.url);
   }

  //get gamers name
  // public sendGamerName(gamer_name: string){
  //   this.socket.emit('gamer-name', gamer_name);   
  // }

  // public getGamerName = () => {
  //   return Observable.create((observer: any) => {
  //       this.socket.on('gamer-name', (gamer_name: any) => {
  //           observer.next(gamer_name);
  //       });
  //   });
  // }

  // join game room
  public joinGameRoom(roomName: string) {
    this.socket.emit('game-play-room', roomName);
  }

  public sendDataToGameRoom(roomName: string, data: any) {
    this.socket.emit('game-play-data', roomName, data);
  }

  public getGameRoomData = () => {
    return Observable.create((observer: any) => {
      this.socket.on('game-play-data', (gameRoomData: any) => {
        if (gameRoomData) {
          observer.next(gameRoomData);
          console.log(gameRoomData);
        } else {
          observer.console.error('Unable to reach server');
        }
      })
    })
  }

}
