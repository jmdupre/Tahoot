import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTogglerComponent } from './item-toggler.component';

describe('ItemTogglerComponent', () => {
  let component: ItemTogglerComponent;
  let fixture: ComponentFixture<ItemTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTogglerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
