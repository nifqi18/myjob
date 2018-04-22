import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumListComponent } from './costum-list.component';

describe('CostumListComponent', () => {
  let component: CostumListComponent;
  let fixture: ComponentFixture<CostumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
