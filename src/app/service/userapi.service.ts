import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { EventHTTP, RunProgressBar } from '@app/service/login.service';


@Injectable()
export class UserapiService {
  apiUrl = 'http://localhost:3333/api/v1/';

  constructor(private http: HttpClient , private loginEvent : EventHTTP) { }

  post(prefixurl, targetPost) {
    return this.http.post(this.apiUrl + prefixurl, targetPost);
  }
  get(prefixurl, targetBody) {
    return this.http.get(this.apiUrl + prefixurl, targetBody);
  }

  Login(postData) {
    this.loginEvent.emit(RunProgressBar);
    return this.post('login' , postData);
        
  }

  getRegister(BodyPost) {
    return this.post('register', BodyPost);
  }

  Register(BodyPost) {
    this.loginEvent.emit(RunProgressBar)
    return this.getRegister(BodyPost)
      .pipe(
        retry(0) //,
        //map(result => this.description(result))
      )
     
  }



}
