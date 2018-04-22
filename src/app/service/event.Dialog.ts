import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventDialog {
    private _Emit : BehaviorSubject<any> = new BehaviorSubject({});
    constructor(){
        this._Emit.next({Exit : true});
    }

    emit(value?){
        return this._Emit.next(value);
    }
    ambil(){
        //return new Subject();
        return this._Emit;
    }

}