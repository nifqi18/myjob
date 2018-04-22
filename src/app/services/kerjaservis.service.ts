import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { DataLowongan } from "../model/lesson";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { KerjaApi } from "@app/services/kerjaapi.service";



export class KerjaDataSource implements DataSource<DataLowongan> {

  private DataLowonganSubject = new BehaviorSubject<DataLowongan[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private coursesService: KerjaApi) {

  }

  loadLessons(courseId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number) {

    this.loadingSubject.next(true);

    

  }

  connect(collectionViewer: CollectionViewer): Observable<DataLowongan[]> {
    console.log('Connecting Data Source');

    return this.DataLowonganSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.DataLowonganSubject.complete();
    this.loadingSubject.complete();
  }

}

