import { Component, OnInit, ViewChild, Renderer2, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { PostKerja } from '@app/service/postkerja';
import { MatHorizontalStepper, MatIconRegistry } from '@angular/material';
import { CoreDialogService, noShowDialog, DialogRunner } from '@app/_dialog/core.dialog.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { PostKerja } from '@app/service/postkerja';
import { EventHTTP, LoginEvent } from '@app/service/login.service';
import { DomSanitizer } from '@angular/platform-browser';

//import { DialogInterface } from '@app/interface';
//import { EventDialog } from '@app/service/event.Dialog';

@Component({
  selector: 'anms-kerja',
  templateUrl: './kerja.component.html',
  styleUrls: ['./kerja.component.scss']
})
export class KerjaComponent implements OnInit, OnDestroy {

  FormKerjaA: FormGroup;
  FormKerjaB: FormGroup;
  buttonEnabled = false;
  params;
  _typelowongan = [
    { value: 'back-end', viewValue: 'Back End Developer' },
    { value: 'froend-end', viewValue: 'Froend End Developer' },
    { value: 'other', viewValue: 'Lain-lain' }
  ];

  _typesalari = [
    { value: 'under-5k', viewValue: 'Dibawah 5juta' },
    { value: 'upto-5k', viewValue: 'Diatas 5juta' },
    { value: 'under-10k', viewValue: 'Dibawah 10Juta' },
    { value: 'upto-10k', viewValue: 'Diatas 10Juta' },
    { value: 'other', viewValue: 'Lain - Lain' }
  ];

  buttonEnabled1 = false;
  constructor(fb: FormBuilder,
    private kerja: PostKerja,
    private ren: Renderer2,
    private dialog: CoreDialogService,
    private router: Router,
    private route: ActivatedRoute, private ev: EventHTTP, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon(
      'check-circle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/mat-circle-check.svg'));

    this.FormKerjaA = fb.group({
      judul: new FormControl('', [Validators.required]),
      content: ['', Validators.required]
    });

    this.FormKerjaB = fb.group({
      lokasi: ['', Validators.required],
      salari: ['', Validators.required],
      benefit: ['', Validators.required],
      type_lowongan: ['', Validators.required]
    });

    this.FormKerjaA.valueChanges.subscribe(x => {
      this.buttonEnabled = this.FormKerjaA.valid;
    })

    this.FormKerjaB.valueChanges.subscribe(x => {
      this.buttonEnabled1 = this.FormKerjaB.valid;
    })




  }


  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild("buttonShow", { read: ElementRef }) btn: ElementRef;
  @ViewChild("buttonShowB", { read: ElementRef }) btn1: ElementRef;
  @ViewChild("animate", { read: ElementRef }) animate: ElementRef;


  ExitFullScreent() {
    this.dialog.emit(noShowDialog)
  }

  Animate() {
    console.log(this.animate.nativeElement)
    this.ren.addClass(this.animate.nativeElement, 'active');
    console.log('img');


  }
  postid = '';
  PostKerja(form) {
    this.ren.addClass(this.btn.nativeElement, 'show');

    this.kerja.post(form.value).subscribe((x: any) => {
      this.ren.removeClass(this.btn.nativeElement, 'show');

      console.log(x);
      if (x == 'failed') {
        return alert('Post Kerja Failed');
      }

      if (typeof x.message !== 'undefined') {
        setTimeout(() => {
          this.postid = x.postid
          this.stepper.next();
        }, 200);
      }


    })
  }

  PostKerjaB(form) {
    const topost = {
      benefit: form.value.benefit,
      lokasi: form.value.lokasi,
      salari: form.value.salari,
      type_lowongan: form.value.type_lowongan,
      id: this.postid
    }

    this.ren.addClass(this.btn1.nativeElement, 'show');
    this.kerja.edit(topost).subscribe((x: any) => {
      if (typeof x.message !== 'undefined') {
        this.stepper.next();
      }
      if (this.stepper.selectedIndex == 2){
        setTimeout(() => {
          this.Animate();
        }, 200);
      }
      this.ren.removeClass(this.btn1.nativeElement , 'show');
    })
    //console.log(form.value);
    //this.stepper.next();

  }

  Done(){
    console.log('DONE');
  }
  ngOnInit() {

    function Animate(param) {
      const animate: any = document.querySelectorAll('.animate');
      animate.forEach(element => {
        if (param == 'add') {
          element.classList.add('active');
        } else {
          const _anim = element.classList;
          _anim.forEach(elem => {
            if (elem == 'active'){
              //console.log('celerbri');
              element.classList.remove('active');
            }
          })
          
        }

      });
    }

    document.addEventListener('click', () => {
      const step = this.stepper.selectedIndex;
      if (step == 2) {
        setTimeout(() => {
          Animate('add')
        }, 200);
      }
      if (step == 1 || step == 0){
        setTimeout(() => {
          Animate('remove')
        }, 200);
      }
    })
    // nanti gampang di fix :()
    var usedLaterScript = document.createElement('script');
    usedLaterScript.src = 'assets/js/ck/ckeditor.js';
    document.body.appendChild(usedLaterScript);

    this.route.paramMap.subscribe((x: ParamMap) => {
      this.params = x.get('id');
    })
  }

  ngOnDestroy() {
    let scripts = document.getElementsByTagName('script');
    for (let index = 0; index < scripts.length; index++) {
      const element = scripts[index];
      if (element.getAttribute('src') == 'assets/js/ck/ckeditor.js') {
        scripts[index].parentNode.removeChild(scripts[index]);
      }
    }

  }

}

