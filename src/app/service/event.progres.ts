import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ProcesCount {

    private countProcess = 0;
    private count: BehaviorSubject<{}> = new BehaviorSubject({});


    constructor() {
        this.count.next(this.countProcess);
     }

    add(value){
      this.countProcess = this.countProcess + value;
      this.count.next(this.countProcess);
    }

    reset(){
        this.countProcess = 0;
        this.count.next(this.countProcess);
    }

    view() {
        return this.count.asObservable();
        //return this.countProcess;
    }
}
