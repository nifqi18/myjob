import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/page/datatable/datatable.component';

@Injectable()
export class UserService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http : HttpClient) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl);
  }

}
