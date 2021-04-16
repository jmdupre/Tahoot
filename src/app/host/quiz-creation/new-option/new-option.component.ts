import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { HostDataService } from 'src/app/services/host-data/host-data.service';

import { INewOption } from '../../host.model';
import { IQuestionOption } from '../quiz-option/quiz-option.component';

@Component({
  selector: 'app-new-option',
  templateUrl: './new-option.component.html',
  styleUrls: ['./new-option.component.css']
})
export class NewOptionComponent {
  @Input() questionId = '';
  @Input() questionOption: INewOption = { id: '', optionText: '', status: false };
  @Input() questionType: string = 'text';
  @Output() updateOptionText: EventEmitter<IQuestionOption> = new EventEmitter();
  @Output() updateOptionImage: EventEmitter<IQuestionOption> = new EventEmitter();
  @Output() updateOptionStatus: EventEmitter<IQuestionOption> = new EventEmitter();

  constructor(private hostDataService: HostDataService) { }

  public onOptionTextValueChange(optionText: string): void {
    const questionOption: IQuestionOption = {
      id: this.questionOption.id,
      optionText,
    }
    this.updateOptionText.emit(questionOption)
  }

  public onOptionImageValueChange(optionImageUrl: string): void {
    const questionOption: IQuestionOption = {
      id: this.questionOption.id,
      optionImageUrl,
    }
    this.updateOptionText.emit(questionOption)
  }

  public onOptionStatusValueChange(): void {
    // this.hostDataService.updateQuestionOptionStatus(this.questionId, this.questionOption.id);
    console.log(status)
    // console.log(status)
    // const questionOption: IQuestionOption = {
    //   id: this.questionOption.id,
    //   status
    // }
    // this.updateOptionText.emit(questionOption)
  }

}
