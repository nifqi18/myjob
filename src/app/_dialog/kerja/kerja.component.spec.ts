import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KerjaComponent } from './kerja.component';

describe('KerjaComponent', () => {
  let component: KerjaComponent;
  let fixture: ComponentFixture<KerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
