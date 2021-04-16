import { Component, Input, OnInit } from '@angular/core';
import { HostDataService } from 'src/app/services/host-data/host-data.service';
import { INewOption } from '../../host.model';
import { newOption } from '../../quiz-data';
import { v4 as uuid } from 'uuid';

export interface IQuestionOption {
  id: string;
  optionText?: string;
  optionImageUrl?: string;
  status?: boolean;
}

@Component({
  selector: 'app-quiz-option',
  templateUrl: './quiz-option.component.html',
  styleUrls: ['./quiz-option.component.css']
})
export class QuizOptionComponent {
  @Input() public questionId = '';
  @Input() public questionOptions?: { type: string, optionList: INewOption[] };
  public questionOptionsList: IQuestionOption[] = [];

  constructor(private hostDataService: HostDataService) { }

  public onQuestionOptionsTypeChange(itemType: string): void {
    this.hostDataService.updateQuestionOptionsType(this.questionId, itemType);
  }

  public handleAddNewQuestionOption(): void {
    this.hostDataService.addNewOption(this.questionId, newOption(uuid()));
  }

  public addOrUpdateOptionTextInOptionsList(option: IQuestionOption): void {
    const optionIndex = this.questionOptionsList.findIndex(optionItem => optionItem.id === option.id);
    if (optionIndex !== -1) {
      this.questionOptionsList[optionIndex].optionText = option.optionText;
      return;
    }
    this.questionOptionsList.push(option);
  }

  public addOrUpdateOptionImageInOptionsList(option: IQuestionOption): void {
    const optionIndex = this.questionOptionsList.findIndex(optionItem => optionItem.id === option.id);
    if (optionIndex !== -1) {
      this.questionOptionsList[optionIndex].optionImageUrl = option.optionImageUrl;
      return;
    }
    this.questionOptionsList.push(option);
  }

  public addOrUpdateOptionStatusInOptionsList(option: IQuestionOption): void {
    const optionIndex = this.questionOptionsList.findIndex(optionItem => optionItem.id === option.id);
    if (optionIndex !== -1) {
      this.questionOptionsList[optionIndex].status = option.status;
      return;
    }
    this.questionOptionsList.push(option);
  }

}
