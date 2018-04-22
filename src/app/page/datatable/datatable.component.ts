import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';

export interface User {
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  }
}


@Component({
  selector: 'dbs-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  providers : [UserService]
})
export class DatatableComponent implements OnInit {
  dataSource = new UserDataSource(this.userService);
  displayedColumns = ['name', 'email', 'phone', 'company'];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUser();
  }
  disconnect() { }
}
