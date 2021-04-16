import { Injectable } from '@angular/core';
import { Host } from 'src/app/classes/host/host';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { INewOption, INewQuestion, INewQuiz } from 'src/app/host/host.model';
import { newOption, newQuiz } from 'src/app/host/quiz-data';

@Injectable({
  providedIn: 'root'
})
export class HostDataService {
  private newQuizBehaviorSubject = new BehaviorSubject<INewQuiz>(newQuiz(uuid()));
  public newQuiz$ = this.newQuizBehaviorSubject.asObservable();

  public currentHostData: Host = new Host();

  constructor() { }

  public updateNewQuiz(name: string, description: ''): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    quiz.name = name;
    quiz.description = description;
    this.newQuizBehaviorSubject.next(quiz);
  }

  public addNewQuestion(question: INewQuestion): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    quiz.questions.push(question);
    this.newQuizBehaviorSubject.next(quiz);
  }

  public updateQuestionType(questionId: string, newType: string): void {
    const quiz = this.newQuizBehaviorSubject.getValue();

    const question = quiz.questions.find(question => question.id === questionId);
    if (question) {
      question.type = newType;
      question.questionImageUrl = '';
    }
    this.newQuizBehaviorSubject.next(quiz);
  }

  public updateQuestionOptionsType(questionId: string, newOptionsType: string): void {
    const quiz = this.newQuizBehaviorSubject.getValue();

    const question = quiz.questions.find(question => question.id === questionId);
    if (question) {
      question.options.type = newOptionsType;
      question.options.optionList = question.options.optionList.map(listItem => ({ ...listItem, optionText: '', optionImageUrl: '' }));
    }
    this.newQuizBehaviorSubject.next(quiz);
  }

  public updateQuestionData(questionId: string, incomingData: any): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    const questionIndex = quiz.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      quiz.questions[questionIndex] = { ...quiz.questions[questionIndex], ...incomingData };
    }
    this.newQuizBehaviorSubject.next(quiz);
  }

  public removeQuizQuestion(questionId: string): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    quiz.questions = quiz.questions.filter(question => question.id !== questionId);
    this.newQuizBehaviorSubject.next(quiz);
  }

  public addNewOption(questionId: string, newOption: INewOption): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    const quizQuestion = quiz.questions.find(question => question.id === questionId);
    if (quizQuestion) {
      quizQuestion.options.optionList.push(newOption);
    }
    this.newQuizBehaviorSubject.next(quiz);
  }

  public removeQuestionOption(questionId: string, optionId: string): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    const questionIndex = quiz.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      quiz.questions[questionIndex].options.optionList = quiz.questions[questionIndex].options.optionList.filter(option => option.id !== optionId);
    }
    this.newQuizBehaviorSubject.next(quiz);
  }

  public updateQuestionOptionData(questionId: string, optionId: string, optionData: any): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    const questionIndex = quiz.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      const questionOptionIndex = quiz.questions[questionIndex].options.optionList.findIndex(option => option.id === optionId);
      if (questionOptionIndex !== -1) {
        const foundOption = quiz.questions[questionIndex].options.optionList[questionOptionIndex];
        quiz.questions[questionIndex].options.optionList[questionOptionIndex] = { ...foundOption, ...optionData };
      }
    }
  }

  public updateQuestionOptionStatus(questionId: string, optionId: string): void {
    const quiz = this.newQuizBehaviorSubject.getValue();
    const questionIndex = quiz.questions.findIndex(question => question.id === questionId);
    if (questionIndex !== -1) {
      quiz.questions[questionIndex].options.optionList = quiz.questions[questionIndex].options.optionList.map(optionItem => {
        if (optionItem.id === optionId) {
          return { ...optionItem, status: true };
        }
        return { ...optionItem, status: false };
      })
    }
  }


  public setHostData(hostData: any) {
    this.currentHostData = hostData.pop();
  }

  public getHostData() {
    return this.currentHostData;
  }


  // public quiz = {
  //   id: '1',
  //   name: 'quiz name',
  //   description: 'quiz Description',
  //   questions: [
  //     {
  //       id: '11',
  //       type: 'text',
  //       question: 'Question 1 here',
  //       timer: 5000,
  //       points: 1000,
  //       options: {
  //         type: 'text',
  //         optionList: [
  //           {
  //             id: '111',
  //             optionText: 'Option text here',
  //             status: 'wrong',
  //           },
  //           {
  //             id: '112',
  //             optionText: 'Option text here',
  //             status: 'correct',
  //           },
  //           {
  //             id: '113',
  //             optionText: 'Option text here',
  //             status: 'wrong',
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: '12',
  //       type: 'image',
  //       question: 'Question 1 here',
  //       questionImageUrl: 'image url here',
  //       timer: 5000,
  //       points: 1000,
  //       options: {
  //         type: 'image',
  //         optionList: [
  //           {
  //             id: '121',
  //             imageUrl: 'Option text here',
  //             status: 'wrong',
  //           },
  //           {
  //             id: '122',
  //             imageUrl: 'Option text here',
  //             status: 'wrong',
  //           },
  //           {
  //             id: '123',
  //             imageUrl: 'Option text here',
  //             status: 'wrong',
  //           },
  //         ]
  //       }
  //     },
  //     {
  //       id: '13',
  //       type: 'image',
  //       question: 'Question 1 here',
  //       questionImageUrl: 'image url here',
  //       timer: 5000,
  //       points: 1000,
  //       options: {
  //         type: 'text',
  //         optionList: [
  //           {
  //             id: '131',
  //             optionText: 'Option text here',
  //             status: 'wrong',
  //           },
  //           {
  //             id: '132',
  //             optionText: 'Option text here',
  //             status: 'wrong',
  //           },
  //           {
  //             id: '133',
  //             optionText: 'Option text here',
  //             status: 'wrong',
  //           },
  //         ]
  //       }
  //     }
  //   ]
  // }

}
