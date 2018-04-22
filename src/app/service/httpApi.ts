import { Injectable } from '@angular/core';
import {
    HttpClient, HttpEvent, HttpEventType,
    HttpRequest, HttpErrorResponse, HttpResponse, HttpParams
} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, last, map, tap, retry, retryWhen, mergeMap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';




@Injectable()
export class HttpServices {

    urlApi = 'http://localhost:3333/api/v1/';
    constructor(private http: HttpClient) { }
    /**
    
     *
     * @description
     * HttpApi For Post.
     * HttpUrl = localhost:3333/v1/api/
     * 
     * 
     * @param type 
     * @param url 
     * @param dataPost? Optional
     *
     * @example 
     * const user = { username : 'admin , password : 'admin'}
     * this.request('post' , 'login' , user).subcribe(x => {
     * console.log(x)
     * })
     * jika menggunakan http params ,, 
     * const init = { params : HttpParams}
     * this.request('get' , 'datalowongan' , )
        
     */
    private request(method: string, url: string , DataRequest ?: string , init?){
       const req = new HttpRequest(method.toString() ,`${this.urlApi + url}` , DataRequest , init)

       return this.http.request(req).pipe(
           retryWhen(error =>
               error.pipe(
                   mergeMap(x => {
                       if (x.status == 401) {
                           return _throw(x)
                       }

                       return of(true)
                   })
               )
           ),
           last(),
           catchError(err => {
               return of(err)
           })   
       )
        
    }

    postWithRetry(url, dataPost) {

        return this.http.post(this.urlApi + url , dataPost).pipe(
            map((event: any) => {
                return event;
            }),
            retryWhen(error =>
                error.pipe(
                    mergeMap(x => {
                        if (x.status == 401) {
                            return _throw(x)
                        }
                        return of(true)
                    })
                )
            ),
            last(), // return last (completed) message to caller
            catchError(err => {
                return of(err)
            })
        );
    }

    GetWithRetry(url, option?) {

        return this.http.get(this.urlApi + url, option ).pipe(
            map((event: any) => {
                return event;
            }),
            retryWhen(error =>
                error.pipe(
                    mergeMap(x => {
                        switch (x.status) {
                            case 401:
                            case 500:
                            case 404:
                            case 400:
                                return _throw(x)

                        }
                      
                        return of(true);
                    })
                )
            ),
            last(), // return last (completed) message to caller
          
        );
    }


}
