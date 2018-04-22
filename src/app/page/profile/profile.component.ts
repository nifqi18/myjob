import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";


import { KerjaApi } from '@app/services/kerjaapi.service';
import { DataLowongan } from '@app/model/lesson';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'dbs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit , AfterViewInit {

  navigationSideMenu = [
    { action: 'post', label: 'Post' },
    { action: 'portofolio', label: 'Portofolio' }
  ]

  public displayedColumns = ["id", "judul", "content" , "salari" , "type_lowongan"];
  public dataSource: SourceKerja = new SourceKerja(this.api);

  public loading = this.dataSource.loading$;
  constructor(private api: KerjaApi) { }
 
  ngOnInit() {
    this.dataSource.LoadAll();
  }
  ngAfterViewInit(){

  }
  Action(pram) {
    console.log(pram)
  }

}



export class SourceKerja implements DataSource<DataLowongan> {

  private DataLowonganSubject = new BehaviorSubject<DataLowongan[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private kerjapi: KerjaApi) { }

  LoadAll() {
    this.loadingSubject.next(true)
    this.kerjapi.loadbyprofile().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(x => {
      this.DataLowonganSubject.next(x)
    })
  }
  
  LoadByPage(params){
    const option = {
      params : new HttpParams().set('params' , params.toString())
    }

    this.kerjapi.loadbyprofile
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

