import { Component, OnInit, OnDestroy } from '@angular/core';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { PekerjaanService } from '@app/service/pekerjaan.service';
import { switchMap } from 'rxjs/operator/switchMap';
import { Router } from '@angular/router';

export class State {
  constructor(public name: string, public population: string, public flag: string) { }
}


@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  form: FormControl;
  hasFocus = false;


  constructor(private api : PekerjaanService , private route : Router) {
    this.form = new FormControl();

    this.filteredStates = this.form.valueChanges
      .distinctUntilChanged()
      .debounceTime(700)
      .do(() => this.hasSearch = true)
      .switchMap(stat => this.filterStates(stat))
      
      

    //this.doSearch();

  }

  HasEnter(form){
    this.route.navigateByUrl(`search/${form.value}`  )
  }


  filteredStates: Observable<any[]>;

  
  Debug(obj) {
    return JSON.stringify(obj);
  }

  hasEnter = false;
  ChangeSearch(form, value?) {

    this.hasEnter = !this.hasEnter;

    return form.value = value;
  }

  filterStates(name: string) {
    return this.api.CariKerja(name)
    /*return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0); */
  }

  hasSearch = false;

  oPenDialog() {

  }
  doSearch() {
    //(change) = "hasSearch = true" 

    this.form.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(x => {
        this.hasEnter = false;

        if (x.length > 0) {
          this.hasSearch = true;
        }

        if (x.length == 0) {
          this.hasSearch = false;

        }

        console.log(x);



      })


    //.do(() => {
    //this.setCari(true);
    //})
    //.switchMap(term => this.main.finduser(term))
    //.do(() => this.setCari())
  }

  ngOnInit() { 
    /*const script = document.createElement('script');
    script.src = 'assets/js/blasy/pf.js';
    document.body.appendChild(script);

    const s2 = document.createElement('script');
    s2.src = 'assets/js/blasy/blasy.js';
    document.body.appendChild(s2);

    const s1 = document.createElement('script');
    s1.innerText =  "var bLazy = new Blazy({container: '.container',success: function (element) {console.log('Element loaded: ', element.nodeName);}});"
    document.body.appendChild(s1); */
  }
  ngOnDestroy(){

  }
}
