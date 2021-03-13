import { Component, Inject, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Question } from 'src/app/classes/question/question';
import { Answer } from 'src/app/classes/answer/answer';
import { Host } from 'src/app/classes/host/host';
import { HostNameService } from 'src/app/services/host-name/host-name.service';
import { HostDataService } from 'src/app/services/host-data/host-data.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RequetsService } from 'src/app/services/http-requests/requets.service';
import { HostDashboardComponent } from '../host-dashboard/host-dashboard.component';
import { HttpClient } from '@angular/common/http';



interface Timer {
  value: number;
}

export class Quiz {
  quiz_name = '';
  questions: any[] = [];
  quiz_id = 0;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

export class QuestionsComponent implements OnInit {
 
  constructor(private http: HttpClient,
              private hostNameService: HostNameService,
              private hostDataService: HostDataService,
              private _snackBar: MatSnackBar,
              private requestService: RequetsService,
              private hostDashboardComponent: HostDashboardComponent
    ) {
      this.question = new Question();
      this.answer1 = new Answer();
      this.answer2 = new Answer();
      this.answer3 = new Answer();
      this.answer4 = new Answer();

      this.question.answer.push(this.answer1, this.answer2, this.answer3, this.answer4);
      this.questions.push(this.question);

   }

   // hiding and showing question contents
   questioncontentshow = false;
   questioncontenthide = true;
   quiz_cards = false;

  timers: Timer[] = [
    {value: 5},
    {value: 10},
    {value: 15},
    {value: 20},
    {value: 25},
    {value: 30}
  ];

  isEditable = true;

  question: Question = new Question();
  answer1: Answer = new Answer();
  answer2: Answer = new Answer();
  answer3: Answer = new Answer();
  answer4: Answer = new Answer();

  host: Host = new Host();
  quiz: Quiz = new Quiz();

  questions: any[] = [];
  image: any;
  imageUrl = "https://cdn.blocktoro.com/wp-content/uploads/2020/06/Money-Heist-Season-5-Plot-Spoilers-and-Storyline-.jpg";
  
  currentEditQuestion: any;
  @ViewChild('stepper') stepper: any;

  // done setting questions
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.host.host_name = this.hostNameService.getHostName();

  }

  createQuestion(){
    // creating a new question and adding new answers
    this.question = new Question();
    this.answer1 = new Answer();
    this.answer2 = new Answer();
    this.answer3 = new Answer();
    this.answer4 = new Answer();
    this.question.answer.push(this.answer1, this.answer2, this.answer3, this.answer4);

    // resetting quiz.questions array
    this.quiz.questions.length = 0;

    this.host = new Host();
    this.host = this.hostDataService.getHostData();

    // pushing question into questions array
    this.questions.push(this.question);    

    // Looping through Host data for quiz name and quiz ID
    this.host.quiz.forEach((quiz: any) => {

      this.quiz.quiz_name = quiz.quiz_name;
      this.quiz.questions.push(this.questions[this.questions.length - 2]);
      this.quiz.quiz_id = quiz.quiz_id;

    });

    // Making a put request
    this.requestService.putRequest('quiz', this.quiz.quiz_id, this.quiz).subscribe();
    this.stepper.selectedIndex = this.questions.length - 1;
    
    const formData = new FormData();
    formData.append('question', JSON.stringify(this.questions[this.questions.length-2]));

     // Uploading an image
    formData.append('file', this.image);

    // To reset image to default
    this.imageUrl = "https://cdn.blocktoro.com/wp-content/uploads/2020/06/Money-Heist-Season-5-Plot-Spoilers-and-Storyline-.jpg";
    this.image = "";
  }

  nextQuestion(){
    this.stepper.selectedIndex = this.questions.length - 1;
  }

  removeQuestion(index: any){
    index = this.questions.indexOf(index, 0);
    this.questions.splice(index, 1);
    this.requestService.getQuiz('quiz', this.quiz.quiz_id).subscribe((quiz: any) => {
      quiz.questions[index];
    });

  }
  Done(){
    this.createQuestion();
    this._snackBar.open('Quiz Created Successfully!', 'Close', {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['panelColorChange']
    });

    this.hostDashboardComponent.showQuizCards();
  }

  Answer(index: number){
    this.questions.forEach((question: any) => {
      question.answer.forEach((answer: any) => {
        answer.is_correct = false;
      });
      if (question.answer[index].is_correct == false) {
        question.answer[index].is_correct = true;
      } else {
        question.answer[index].is_correct = false;
      }
    });
  }

  onFileSelected(event: any) {
    if(event.target.files.length > 0){
      this.image = event.target.files[0];

      var reader = new FileReader();
      reader.readAsDataURL(this.image)
      reader.onload=(readerEvent: any)=>{
        this.imageUrl = readerEvent.target.result;
      }
    }
  }
  
}
