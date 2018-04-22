import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActionAuthLogin } from '@app/core';
import { Router } from '@angular/router';
import { EventHTTP, noRunProgressBar } from '@app/service/login.service';
import { UserapiService } from '@app/service/userapi.service';


@Component({
  selector: 'anms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ErrorMessage: any = '';
  FormLogin: FormGroup;
  LoginEnabled = false;
  ShowError = false;
  Login;
  hide = true;

  constructor(fb: FormBuilder,
    private login: UserapiService,
    private logService: EventHTTP,
    private store: Store<any>,
    private route: Router) {
    this.FormLogin = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: ['', Validators.required]
    });

    this.FormLogin.valueChanges.subscribe(x => {
      this.LoginEnabled = this.FormLogin.valid;
    });

  }
  get email() { return this.FormLogin.get('email'); }
  get passw() { return this.FormLogin.get('password'); }

  ngOnInit() { }


  DoLogin(form) {

    this.Login = false;
    this.ErrorMessage = '';

    this.login.Login(form.value).subscribe((x: any) => {

      this.logService.emit(noRunProgressBar);
      this.store.dispatch(new ActionAuthLogin(x.content));
      this.route.navigateByUrl('/pekerjaan');

    }, (err : any) => {
      console.log(err)
      this.Login = true;
      this.ErrorMessage = 'Login Failed'
      setTimeout(() => {
        this.Login = false;
        this.ErrorMessage = '';
      }, 5000);

      this.logService.emit(noRunProgressBar)
    })

    /** */
    //console.log(form.value);
  }

}
