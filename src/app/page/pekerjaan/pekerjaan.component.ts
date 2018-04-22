import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { DataLowongan } from '@app/model/lesson';

import { Observable } from 'rxjs/Observable';
import { PekerjaanService } from '@app/service/pekerjaan.service';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


export class User {
  constructor(public name: string) { }
}


@Component({
  selector: 'dbs-pekerjaan',
  templateUrl: './pekerjaan.component.html',
  styleUrls: ['./pekerjaan.component.scss'],
})
export class PekerjaanComponent implements OnInit, AfterViewInit {
  Count: number = 0;
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;



  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;


  navigation = [
    { link: 'Today', label: '<i class="material-icons">today</i> Hari Ini' },
    { link: 'Kemarin', label: '<i class="material-icons">access_time</i> Kemarin' },
    { link: 'Seminggu', label: '<i class="material-icons">timelapse</i> Satu Minggu' },
    { link: 'Back-End', label: '<i class= "material-icons">touch_app</i> Back-End' },
    { link: 'Front-End', label: '<i class="material-icons">screen_share</i> Froend-End' },
    { link: 'Magang', label: '<i class="material-icons">screen_share</i> Magang' },
    { link: 'Salari', label: '<i class="material-icons">screen_share</i> Salari' }


  ];
  navigationSideMenu = [
    ...this.navigation,
  ];


  @ViewChild('filterinputbar', { read: ElementRef }) filterbar: ElementRef;
  @ViewChild('filterinputnav', { read: ElementRef }) filternav: ElementRef;

  constructor(private Api: PekerjaanService, private ren2: Renderer2) { }


  public $loading = this.Api.loading$;
  public lowongandata: Observable<DataLowongan[]>

  myControl = new FormControl();

  options = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor')
  ];

  filteredOptions: Observable<User[]>;



  tfilter(name: string): User[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }


  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.tfilter(name) : this.options.slice())
      );

    this.Api.LowonganGroupTime('ALL');
    this.lowongandata = this.Api.AllData();

    //this.Count = <number>this.Api.Count();


  }

  Filter(item, index?) {
    const element: Element[] = this.filterbar.nativeElement.children;

    if (item == 'all') {
      var t = {
        link: 'all',
        label: '</i>Semua'
      }
      item = t;
    }

    this.filterby = item.link;


    let cari = item.label.split('</i>');

    if (item) {
      for (const f of element) {
        // ini nanti pengecekan class apakah ada active atau tidak
        const el = f.getAttribute('class');
        const index = f.textContent.indexOf(cari[1]);

        if (index > 1) {
          f.classList.add('active');
        } else {
          f.classList.remove('active');
        }

      }

      this.Api.LowonganGroupTime(item.link);
    }
    return false;
  }

  filterby = '';

  /*

  lowkerdata

  */


  ngAfterViewInit() {

    this.lowongandata
      .subscribe((x: any) => {
        if (x.length > 0){
          return this.Count = x[0].total;
        }
        this.Count = x.length;
      })
    //this.kerjaApi.findLessons()
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    /*fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadLessonsPage();
        })
      )
      .subscribe(); 

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe(); */

    //this.dataSource.connect()
  }


  loadLessonsPage() {
    /*this.dataSource.loadLessons(
      this.lowongan.id,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize); */
  }


  openLink(link: string) {
    window.open(link, '_blank');
  }


}


