import { Injectable } from '@angular/core';
import { HttpServices } from '@app/service/httpApi';

import { DataLowongan } from '@app/model/lesson';


/**
 * @description rxjs Operator
 */
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize,map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import _ from 'lodash';
import *as moment from 'moment';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PekerjaanService {

    private DataLowonganSubject = new BehaviorSubject<any[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpServices) { }

    private _GetLowongan(): Observable<DataLowongan[]> {
        this.loadingSubject.next(true)
        return this.http.GetWithRetry('datalowongan').pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
    }

    GetLowkerById(paramsId) {
        const params = new HttpParams()
            .set('id', paramsId.toString())
        const option = {
            params: params
        }
        this.loadingSubject.next(true)
        return this.http.GetWithRetry('lowongan', option).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))

        )
    }

    LowonganGroupTime(filterParams?: string) {
        return this._GetLowongan().pipe(
            map((res: DataLowongan[]) => {
                const data = res['data'];
                const format = 'D MMMM Y';

                data.sort((a, b) => {
                    return a.updated_at < b.updated_at ? 1 : -1;
                });
                const now = new Date()

                let dataFilter = [];
                if (filterParams) {
                    switch (filterParams.toLowerCase()) {
                        case 'seminggu':
                        case 'all':
                            dataFilter = data;
                            break;
                        case 'today':
                        case 'kemarin':
                            dataFilter = data.filter(x => {
                                return moment(x.updated_at).format(format) == moment(now).format(format);
                            })
                            break;
                        case 'front-end':
                        case 'back-end':
                            dataFilter = data.filter(x => {
                                return x.type_lowongan == filterParams.toLocaleLowerCase()
                            })
                            break;

                    }
                }


                let groupedMessages = _.groupBy(dataFilter, (lowker) => {
                    return moment(lowker.updated_at).format(format);
                });

                return Object.keys(groupedMessages).map((timestamp: string) => {

                    return {
                        filtercontent: timestamp,
                        data: groupedMessages[timestamp],
                        today: moment().format(format) === timestamp,
                        total: data.length,
                        subtotal: groupedMessages[timestamp].length
                    };
                });

            })
        ).subscribe(x => {
            this.DataLowonganSubject.next(x)
        })
    }
    /**
     * @description 
     * 
     */
    AllData(): Observable<any[]> {
        return this.DataLowonganSubject.asObservable();
    }

    private _Count(){
       
        return new Promise((resolve) => {
            this.DataLowonganSubject
            .filter(x => x.length > 0 && x !== [])
            .subscribe(x => {
                const count = x[0].total;
                resolve(count)
            })
        })

    }

    async Count(){
        const count = await this._Count();
        return count;
    }

    /**
     * @description 
     * Ini adalah api sederhana untuk penggunaaan filter :P
     * 
     * @param params
     * example
     * this.Searh('time')
     */

    CariKerja(params) {
        const param = new HttpParams().set('params' , params.toString())
        const option = {
            params : param
        }
        return this.http.GetWithRetry('search' , option).pipe(
            map(x => x['message']),
            catchError((e) => {
                console.log(e);
                return of([])
            })
        )
    }

}