import { Injectable } from '@angular/core';
import { HttpServices } from '@app/service/httpApi';
import { EventHTTP, noRunProgressBar, RunProgressBar } from '@app/service/login.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostKerja {

    constructor(private http: HttpServices, private ev: EventHTTP) { }

    post(dataPost) {
        //this.ev.emit(RunProgressBar);
        return this.http.postWithRetry('postkerja', dataPost);
    }

    edit(dataPost) {
        return this.http.postWithRetry('updatekerja' , dataPost);
    }

    delete() {

    }
}
