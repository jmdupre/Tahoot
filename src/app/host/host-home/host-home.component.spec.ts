import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostHomeComponent } from './host-home.component';

describe('HostHomeComponent', () => {
  let component: HostHomeComponent;
  let fixture: ComponentFixture<HostHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
