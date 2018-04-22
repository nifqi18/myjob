import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'anms-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() Message = '';
  @Input() ShowMessage = false;

  constructor() { }

  ngOnInit() {
  }

}
