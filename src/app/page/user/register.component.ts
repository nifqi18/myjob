import { Component, OnInit, ViewChildren, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserapiService } from '@app/service/userapi.service';
import { noRunProgressBar, EventHTTP } from '@app/service/login.service';

@Component({
  selector: 'anms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  FormRegister: FormGroup;
  ButtonEnabled = false;

  Login = false;

  ErrorMessage = '';
 
  constructor(fb: FormBuilder, private api: UserapiService, private log: EventHTTP) {
    this.FormRegister = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });

    this.FormRegister.valueChanges.subscribe(x => {
      this.ButtonEnabled = this.FormRegister.valid;
    })
  }

  get email() {
    return this.FormRegister.get('email')
  }
  get password() {
    return this.FormRegister.get('password')
  }
  get repassword() {
    return this.FormRegister.get('repassword')
  }

  public userEvent = new EventEmitter<boolean>();
  public passEvent = new EventEmitter<boolean>();

  Message = '';
  DoRegister(form = null) {
    //this.Login = true;
    this.Message = 'Please Wait .. ';
    this.api.Register(form.value).subscribe(x => {
      this.log.emit(noRunProgressBar);
      // login to 
      //this.api.Login({email : form.value.email , password : form.value.password});
      console.log(x);
    }, (err) => {
      const error = err.error;
      this.log.emit(noRunProgressBar);
      this.Message = 'Done!!!';
      if (typeof error.message !== 'undefined') {
        return this.Message = error.message;
      }
      if (typeof error.password != 'undefined') {
        this.passEvent.emit(true);
        return this.password.setErrors({ "MinLength": "true" })

      }
      this.userEvent.emit(true);
      this.email.setErrors({ "Email": "Email sudah di daftarkan" })

    }, () => {

    });

  }

  Debug(obj) {
    return JSON.stringify(obj);
  }
  ngOnInit() {
  }

}
