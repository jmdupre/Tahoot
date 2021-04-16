import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { GamePlayDataService } from 'src/app/services/game-play-data/game-play-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-gameplay',
  templateUrl: './host-gameplay.component.html',
  styleUrls: ['./host-gameplay.component.css']
})
export class HostGameplayComponent implements OnInit {

  gamePlayData: any[] = [];
  timer = 0;
  points = 0;
  reducer = 0;
  public gamePin = 0;
  questions: any[] = [];
  count = 0;
  nextButton = false;
  startButton = true;
  current_question: any[] = [];
  numberOfQuestions = 0;
  showPodiumButton = false;
  podium = false;


  constructor(private websocketService: WebsocketService, private gamePlayDataSerivce: GamePlayDataService,
              private router: Router) { }

  ngOnInit(): void {
    this.gamePlayData.push(this.gamePlayDataSerivce.getGamePlayData());

    // looping through the array various questions
    this.gamePlayData.forEach((host: any) => {
      host.quiz.forEach((quiz: any) => {
        this.gamePin = quiz.game_pin;
        quiz.questions.forEach((question: any) => {
          this.questions.push(question);
          this.numberOfQuestions = this.questions.length;
        });
      });
    });




    setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.points = parseFloat(((this.points - this.reducer).toFixed(0)));
        if (this.timer == 0){
          console.log(this.numberOfQuestions);
          console.log(this.count);
          console.log(this.count + 1);

          // keeping track of the number of questions
          if (this.numberOfQuestions == this.count){
            this.nextButton = false;
            this.showPodiumButton = true;
            this.current_question.pop();
          }
        else {
          this.nextButton = true;
        }

        } else {
          this.nextButton = false;
        }
      } else {
        this.timer;
      }
    }, 1000);
  }


  // sending question to websocket
  sendQuestion(){
    this.current_question.pop();
    this.current_question.push(this.questions[this.count]);
    this.current_question.forEach((data: any) => {
      this.timer = data.timer;
      this.points = data.points;
      this.reducer = (this.points / this.timer);
    });
    this.websocketService.sendDataToGameRoom(this.gamePin.toString(), this.current_question);
    this.count = this.count + 1;
    this.startButton = false;
    this.nextButton = false;
    this.showPodiumButton = false;
    if (this.startButton == false) {
      this.startButton = false;
    } else {
      this.startButton = false;
    }

  }

  // display Podium after gameplay
  showPodium(){
    this.showPodiumButton = false;
    this.podium = true;
    this.websocketService.sendPodiumState(this.gamePin.toString(), true);
  }


  gameOver(){
    this.router.navigate(['/host-dashboard']);
  }

}
