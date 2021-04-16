import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  private url = 'https://tahoot-websocket.herokuapp.com';
  public socket;

  constructor() {
    this.socket = io(this.url);

   }

  // join game a room
  public joinGameRoom(roomName: string) {
    this.socket.emit('game-play-room', roomName);
  }

  // game room data
  public sendDataToGameRoom(roomName: string, data: any) {
    this.socket.emit('game-play-data', roomName, data);
  }

  public getGameRoomData(){
    const observable = new Observable((observer: any) => {
      this.socket.on('game-play-data', (gameRoomData: any) => {
              if (gameRoomData) {
                observer.next(gameRoomData);
              } else {
                observer.console.error('Unable to reach server');
              }
            });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // scores for scoreboard
  public sendScoreForScoreboard(roomName: string, data: any){
    this.socket.emit('scoreboard', roomName, data);
  }

  public getScoresForScoreboard(){
    const observable = new Observable((observer: any) => {
      this.socket.on('scoreboard', (scores: any) => {
        if (scores){
          observer.next(scores);
        } else {
          observer.console.error('Unable to read server');

        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // state of podium
  public sendPodiumState(roomName: string, data: any){
    this.socket.emit('podium-state', roomName, data);
  }

  public getPodiumState(){
    const observable = new Observable((observer: any) => {
      this.socket.on('podium-state', (scores: any) => {
        if (scores){
          observer.next(scores);
        } else {
          observer.console.error('Unable to read server');

        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  // data for podium
  public sendPodiumData(roomName: string, data: any){
    this.socket.emit('podium-data', roomName, data);
  }

  public getPodiumData(){
    const observable = new Observable((observer: any) => {
      this.socket.on('podium-data', (scores: any) => {
        if (scores){
          observer.next(scores);
        } else {
          observer.console.error('Unable to read server');

        }
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
