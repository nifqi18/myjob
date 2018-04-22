import { Component, OnInit, Input} from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'dbs-search-control',
  templateUrl: './search-control.component.html',
  styleUrls: ['./search-control.component.scss']
})
export class SearchControlComponent implements OnInit {

  @Input() formControlA: FormControl;
  @Input() placeholder = '';
  @Input() value = '';
  hasFokus = false;

  constructor() { }

  ngOnInit() {
  }

}
