import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


/* Interface Dialog Runner */
export class DialogRunner { running: boolean; };
export const ShowDialog: DialogRunner = { running: true };
export const noShowDialog: DialogRunner = { running: false};


@Injectable()
export class CoreDialogService {

  private Emiter: BehaviorSubject<DialogRunner> = <BehaviorSubject<DialogRunner>>new BehaviorSubject(ShowDialog);
  constructor() { }
  emit(value: DialogRunner) {
    return this.Emiter.next(value);
  }
  ambil() {
    return this.Emiter;
  }

}
