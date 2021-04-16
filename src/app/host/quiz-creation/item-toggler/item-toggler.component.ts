import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-toggler',
  templateUrl: './item-toggler.component.html',
  styleUrls: ['./item-toggler.component.css']
})
export class ItemTogglerComponent {
  @Input() public activeItem = 'text';
  @Output() public onToggleChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public handleTogglerOnChange(itemType: string): void {
    this.onToggleChange.emit(itemType);
  }

}
