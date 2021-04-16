import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HostDataService } from 'src/app/services/host-data/host-data.service';
// import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent {
  @Input() public questionId = '';
  @Input() public questionType = '';

  public formGroup: FormGroup;
  public questionText = '';

  constructor(private _formBuilder: FormBuilder, private hostDataService: HostDataService) {
    this.formGroup = this._formBuilder.group({
      formControl: ['', Validators.required]
    });


  }

  public onQuestionTypeChange(itemType: string): void {
    this.hostDataService.updateQuestionType(this.questionId, itemType);
  }

  public onChange(text: string) {
    this.questionText = text.trim();
  }




}
