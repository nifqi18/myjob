import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';
//import { EventDialog } from '@app/service/event.Dialog';
import { KerjaComponent } from '@app/_dialog/kerja/kerja.component';
import { CoreDialogService, ShowDialog, DialogRunner } from '@app/_dialog/core.dialog.service';
import {
  HttpClient, HttpEvent, HttpEventType,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { routerTransition, ANIMATE_ON_ROUTE_ENTER, ActionAuthUser } from '@app/core';
import { _throw } from 'rxjs/observable/throw';
import { map, retryWhen, mergeMap, tap, last, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';


//import { PostKerjaComponent } from '@app/private/post-kerja/post-kerja.component';

@Component({
  selector: 'anms-dialog',
  template: '',
})
export class DialogComponent implements OnInit {

  dialogRef: MatDialogRef<DialogContentComponent>;

  config: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '800px',
    height: '600px',
    position: {
      top: '15px',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
      message: 'Jazzy jazz jazz'
    }
  };


  constructor(public dialog: MatDialog,
    @Inject(DOCUMENT) private doc: any,
    private router: Router,
    private dialogEv: CoreDialogService
  ) {

    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });


    this.openModal();

  }

  Exited = false;


  openModal() {
    this.dialogEv.emit(ShowDialog);

    this.dialogRef = this.dialog.open(DialogContentComponent, this.config);


    this.dialogRef.afterClosed().subscribe((result: string) => {
      //this.dialogRef = null;
      this.router.navigateByUrl('/pekerjaan');
      if (this.Exited) {
        this.router.navigateByUrl('v1/postkerja/full/1');
        //this.router.navigate(['v1/postkerja'], { fragment: 'top' });
        //this.router.navigate(['/v1/postkerja/full'] , )
      }

      this.doc.body.classList.remove('no-scroll');

    });


  }

  ngOnInit() {

    this.dialogEv.ambil().subscribe((x: DialogRunner) => {
      console.log(x);

      if (x.running) {
        return this.Exited = false;
        //return console.log(x);
      }
      this.Exited = true;
      this.dialogRef.close();

    }, () => console.log('Complete'))
  }

}

@Component({
  selector: 'demo-jazz-dialog',
  templateUrl: 'dialog-component.html',
  animations: [routerTransition]
})
export class DialogContentComponent implements OnInit {
  EventConnected = 'Silahkan tunggu .. ';
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  constructor(private http: HttpClient, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer , private store : Store<any>) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/md-close.svg'));
  }



  Logged = true;

  Close() {
    console.log('test');

  }

  ngOnInit() {

    this.EventConnected = 'Silahkan tunggu ...'
    this.Auth().subscribe((x: any) => {
      if (typeof x.userid !== 'undefined') {
        this.store.dispatch(new ActionAuthUser(x))
        this.EventConnected = 'Authed';
        setTimeout(() => {
          this.Logged = false;
        }, 500);
      }


      console.log(x)
      if (x == 'NoAuth') {
        this.EventConnected = x;
        setTimeout(() => {
          this.Logged = false;
        }, 500);
      }
    });
  }

  Auth() {

    return this.http.get('http://localhost:3333/api/v1/currentuser').pipe(
      map((event: any) => {
        return event.message;
      }),
      retryWhen(error =>
        error.pipe(
          mergeMap(x => {
            if (x.status == 401) {
              return _throw(x)
            }
          })
        )
      ),
      tap(message => this.showProgress(message)),
      last(), // return last (completed) message to caller
      catchError(err => {
        console.log(err);
        const tosub = "NoAuth"
        return of(tosub)
      })
    );
  }

  // getDataWithConditionalRetry(url) { return this.http.get(url)(error => { return error.flatMap((error: any) => { if (error.status === 503) { return Observable.of(error.status).delay(this.delay) } return Observable.throw({ error: 'No retry' }); }).take(this.retries).concat(Observable.throw({ error: `Sorry, there was an error after ${this.retries} retries` })); }); }


  private showProgress(message: string) {
    console.log(message);
  }

}

