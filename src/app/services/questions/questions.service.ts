import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export class Question{
  question_body = '';
  points = 0;
  timer = 0;
  answer: any[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  questions: any[] = [];

  constructor() { }

  // setter and getter

  setQuestion(question: Question[]){
    this.questions = question;
  }

  getQuestion(){
    return this.questions;
  }
}
