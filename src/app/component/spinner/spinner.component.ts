import { Component, OnInit } from '@angular/core';
import { EventHTTP } from '@app/service/login.service';

@Component({
  selector: 'dbs-progress-bar',
  template: `<mat-progress-bar mode="indeterminate" [hidden]="!Running"></mat-progress-bar>`
})
export class SpinnerComponent implements OnInit {
  Running = false;

  constructor(private Ev: EventHTTP) { }

  ngOnInit() {
    this.Ev.all().subscribe((x: any) => {
      if (x.Running) {
        return this.Running = true;
      }
      return this.Running = false;
    })
  }
}