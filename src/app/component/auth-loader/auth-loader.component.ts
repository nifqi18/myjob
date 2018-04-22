import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dbs-auth-loader',
  templateUrl: './auth-loader.component.html',
  styleUrls: ['./auth-loader.component.scss']
})
export class AuthLoaderComponent implements OnInit {

  constructor() { }
  authenticated = false;

  ngOnInit() {
  }

}
