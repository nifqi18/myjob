import { Title, DOCUMENT } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';



import {
  ActionAuthLogin,
  ActionAuthLogout,
  selectorAuth,
  routerTransition
} from '@app/core';
import { environment as env } from '@env/environment';

import { NIGHT_MODE_THEME, selectorSettings } from './settings';
import { FullscreenService } from '@app/fullscreen.service';
import { Observable } from 'rxjs/Observable';
import { NgDeepLazyLoad } from '@app/testmodule/lib/ngdeep.service';

@Component({
  selector: 'dbs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  @HostBinding('class') componentCssClass;

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  navigation = [
    { link: 'about', label: 'About' },
    { link: 'pekerjaan', label: 'Pekerjaan' },
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Portofolio' }
  ];
  isAuthenticated;

  constructor(
    public overlayContainer: OverlayContainer,
    private store: Store<any>,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private doc: any, private full: FullscreenService, private ij: NgDeepLazyLoad) {

    this.ij.AttactCssOrScript();
    this.ij.LoadCss('https://fonts.googleapis.com/icon?family=Material+Icons');
  }

  fullscreen: Observable<any>;


  ngOnInit(): void {

    this.fullscreen = this.full.fullscreen$;

    this.store
      .select(selectorSettings)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(settings => {
        const { theme, autoNightMode } = settings;
        const hours = new Date().getHours();
        const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
          ? NIGHT_MODE_THEME
          : theme
        ).toLowerCase();
        this.componentCssClass = effectiveTheme;
        const classList = this.overlayContainer.getContainerElement().classList;
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );
        classList.remove(...toRemove);
        classList.add(effectiveTheme);
      });

    // hajar :P
    this.store
      .select(selectorAuth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((auth: any) => {
        console.log(auth);
        if (typeof auth.Store !== 'undefined') {
          if (auth.Store.token == '') {
            return this.isAuthenticated = false;
          }
          return this.isAuthenticated = true;
        }
        return this.isAuthenticated = false;
      });

    // set title di setiap route 
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof ActivationEnd)
      )
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });

    /*var script = this.doc.createElement('script');
    script.src = 'assets/js/cssrelpreload.js';
    this.doc.body.appendChild(script); */
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout(''));
  }

  onSettingClick(){
    this.router.navigate(['/setting'])
  }

  onProfileClick(){
    this.router.navigate(['/profile'])
  }
}
