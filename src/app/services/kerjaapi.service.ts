import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SourceLowongan, Lowongan } from "../model/course";
import { map } from "rxjs/operators";
import { DataLowongan } from "../model/lesson";
import { HttpServices } from "@app/service/httpApi";


@Injectable()
export class KerjaApi {

  constructor(private http: HttpServices) {}
  
  loadbyprofile(): Observable<DataLowongan[]> {
    const option = {
      params : new HttpParams().set('params' , '1')
    }
    return this.http.GetWithRetry(`loadbyprofile` , option)
      .pipe(
        map(res => res['data'])
      );
  }

  
  findLessons(
    courseId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3) {

    /*return this.http.get(`${this.apiUrl}/allpostkerja`, {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => {
        return res["data"]
      })
    );*/
  }

}