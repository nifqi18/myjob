import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class LoginEvent {
    Running: boolean;
}

export const noRunProgressBar: LoginEvent = {
    Running: false
}

export const RunProgressBar: LoginEvent = {
    Running: true
}



@Injectable()

export class EventHTTP {
    private _Emiter: BehaviorSubject<LoginEvent> = <BehaviorSubject<LoginEvent>>new BehaviorSubject({});
    constructor() {
        //this._Emiter.next(noRunProgressBar);
    }
    /**
     * @description 
     * Login Event Http , targetnya membuat progressbar jalan
     * di setiap user melakukan post , get , put , delete
     * @param value:LoginEvent 
     * Isi dari Login Event noRunProgressBar atau RunProgressBar
     * @example
     * ...
     * this.emit(noRunProgressBar);
     * ...
     */

    emit(value: LoginEvent) {
        this._Emiter.next(value);
    }
    /**
     * @description
     * Event All Bertugas mengammbil semua stream Subject yang selesai
     * di Emit
     */
    all() {
        return this._Emiter;
    }

}