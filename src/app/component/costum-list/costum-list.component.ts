import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'dbs-costum-list',
  templateUrl: './costum-list.component.html',
  styleUrls: ['./costum-list.component.scss']
})
export class CostumListComponent implements OnInit {


  @Input('ItemSearch') ItemSearch : EventEmitter<any[]>;

  constructor() { }

  ngOnInit() {
    this.ItemSearch
    .filter(x => x !== [] && x.length > 0)
    .subscribe(x => {
      console.log(x);
    })
  }

}
