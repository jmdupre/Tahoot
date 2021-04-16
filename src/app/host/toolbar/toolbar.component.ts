import { Component, Output, EventEmitter } from '@angular/core';
import { CurrentHostPage } from '../host.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() public toggleCurrentPage: EventEmitter<CurrentHostPage> = new EventEmitter<CurrentHostPage>();

  public getCurrentPage(page: CurrentHostPage): void {
    this.toggleCurrentPage.emit(page);
  }

}
