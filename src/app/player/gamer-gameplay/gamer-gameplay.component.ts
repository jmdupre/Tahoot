import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamerNameService } from 'src/app/services/gamer-name/gamer-name.service';
import { GamerDetails } from 'src/app/classes/gamer-details/gamer-details';
import { AuthService } from 'src/app/services/authentication/auth.service';


@Component({
  selector: 'app-gamer-name',
  templateUrl: './gamer-gameplay.component.html',
  styleUrls: ['./gamer-gameplay.component.css']
})
export class GamerGameplayComponent implements OnInit {

  constructor(private websocketService: WebsocketService,
              private gamerNameService: GamerNameService, private authService: AuthService) { }

  timer = 0;
  points = 0;
  reducer = 0;

  correctAnswer = '';

  roomName = '';
  gamerName = '';
  gamePlayData: any;
  gamerDetails = true;
  gamePlayContent = false;
  spinnerDisplay = false;
  choosenAnswerTimer = false;

  gamersDetails: any[] = [];

  // cards displayed when answer is choosen
  correctCard = false;
  wrongCard = false;
  timeoutCard = false;

  // gamer-answer
  gamerAnswer: GamerDetails = new GamerDetails();

  playerAnswer: any;
  pointsGotten = 0;

  // podium display
  showPodium = false;

  ngOnInit(): void {
    this.authService.isNotLogin();

    this.websocketService.getGameRoomData().subscribe((question: any) => {
      this.gamePlayData = question;

      const game = setInterval(() => {
        if (this.gamePlayData.length > 0){
          clearInterval(game);
          this.gameplay();
        }
        else {
          this.correctCard = false;
          this.wrongCard = false;
          this.timeoutCard = false;
          this.gamerDetails = false;
          this.spinnerDisplay = false;
          this.gamePlayContent = false;
        }
      }, 1000);
    });

    // monitoring podium channel on the websocket
    this.websocketService.getPodiumState().subscribe((data: any) => {
      this.showPodium = data;
      this.timeoutCard = false;
      if (this.showPodium == true){
        this.correctCard = false;
        this.wrongCard = false;
        this.gamerDetails = false;
        this.spinnerDisplay = false;
        this.gamePlayContent = false;
      }
    });
  }

  // timer and points reducer
  timerPointsReducer(){
    const gameTimerPointsReducer = setInterval(() => {
      if (this.timer > 0) {
        this.timer = this.timer - 1;
        this.points = parseFloat(((this.points - this.reducer).toFixed(0)));
      } else {
        clearInterval(gameTimerPointsReducer);
        if (this.correctCard == false && this.wrongCard == false) {
          this.websocketService.sendScoreForScoreboard(this.roomName, this.gamerAnswer);
          this.timeoutCard = true;
          this.wrongCard = false;
          this.correctCard = false;
          this.gamePlayContent = false;
        } else if (this.correctCard == true || this.wrongCard == true) {
          this.timeoutCard = false;
        }
      }
    }, 1000);
  }

  sendGamerName(){
    // joining game room and sending gamer name to game room
    this.gamerNameService.setGamerName(this.gamerName);
    this.websocketService.joinGameRoom(this.roomName);
    this.websocketService.sendDataToGameRoom(this.roomName, this.gamerName);
    this.gamerDetails = false;
    this.spinnerDisplay = true;
    this.gamePlayContent = false;
    this.gamerAnswer.gamer_name = this.gamerNameService.getGamerName();
  }

  choosenAnswer(index: number){
    this.pointsGotten = this.points;
    this.gamePlayData.forEach((question: any) => {
        this.playerAnswer = question.answer[index];
      });

    if (this.playerAnswer.is_correct == true) {
        this.gamePlayContent = false;
        this.gamerAnswer.points = this.gamerAnswer.points + this.pointsGotten;
        this.gamePlayContent = false;
        this.wrongCard = false;
        this.timeoutCard = false;
        this.correctCard = true;
      } else if (this.playerAnswer.is_correct == false) {
        this.gamePlayContent = false;
        this.gamerAnswer.points = this.gamerAnswer.points - this.pointsGotten;
        this.gamePlayContent = false;
        this.correctCard = false;
        this.timeoutCard = false;
        this.wrongCard = true;
      }

    this.websocketService.sendScoreForScoreboard(this.roomName, this.gamerAnswer);
    return this.gamerAnswer.points;
  }

  gameplay(){
      this.correctCard = false;
      this.wrongCard = false;
      this.timeoutCard = false;
      this.gamerDetails = false;
      this.spinnerDisplay = false;
      this.gamePlayContent = true;
      this.timer = 0;
      this.points = 0;

      this.gamePlayData.forEach((question: any) => {
          this.points = question.points;
          this.timer = question.timer;
          this.reducer = (this.points / this.timer);
          question.answer.forEach((answer: any) => {
            if (answer.is_correct == true) {
              this.correctAnswer = answer.answer_body;
            }
          });
      });

      this.timerPointsReducer();
  }


}
