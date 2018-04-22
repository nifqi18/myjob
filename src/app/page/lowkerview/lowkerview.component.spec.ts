import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowkerviewComponent } from './lowkerview.component';

describe('LowkerviewComponent', () => {
  let component: LowkerviewComponent;
  let fixture: ComponentFixture<LowkerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowkerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowkerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
