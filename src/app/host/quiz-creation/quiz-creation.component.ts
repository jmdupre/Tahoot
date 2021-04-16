import { Component, OnInit } from '@angular/core';
import { HostDataService } from 'src/app/services/host-data/host-data.service';
import { INewQuiz } from '../host.model';
import { newQuestion } from '../quiz-data';
import { v4 as uuid } from 'uuid';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-creation',
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.css']
})
export class QuizCreationComponent implements OnInit {
  public isQuestionPageVisible = false;
  public quizData?: INewQuiz;

  public quizForm = new FormGroup({
    quizName: new FormControl(''),
    quizDescription: new FormControl('')
  });

  constructor(private hostDataService: HostDataService) { }

  ngOnInit(): void {
    this.hostDataService.newQuiz$.subscribe((quizData => this.quizData = quizData));
  }

  public handleNext(): void {
    const formControl = this.quizForm.controls;
    if (formControl.quizName.value.trim() !== '') {
      this.isQuestionPageVisible = true;
      this.hostDataService.updateNewQuiz(formControl.quizName.value, formControl.quizDescription.value);
    }

  }

  public handleAddNewQuestion(): void {
    this.hostDataService.addNewQuestion(newQuestion(uuid()));
  }

}

