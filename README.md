ng new HellowCordova

ng add @angular/material

ng generate @angular/material:material-nav --name myNav

<my-nav></my-nav>

ng g c camera
ng g c geolocation
ng g c codebar

touch app.routes.ts

import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: 'camera', component: CameraComponent },
    // { path: 'geolocation', component: GeolocationComponent },
    // { path: 'codebar', component: CodebarComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

imports: [
  ...
   ROUTES
  ...
],

<a mat-list-item [routerLink]="['/camera']">camera 1</a>
<a mat-list-item [routerLink]="['/geolocation']">geolocation 2</a>
<a mat-list-item [routerLink]="['/codebar']">codebar 3</a>

--->> Cordova

npm install -g cordova
cordova create HelloCordovaMobileApp com.utfpr.edu "HelloCordovaMobileApp"

cd HelloCordovaMobileApp
cordova platform add browser
cordova run browser

rm -rf /www

ng build --prod --base-href . --output-path ../HelloCordovaMobileApp/www/

<script type=”text/javascript” src=”cordova.js”></script>

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
};

if (typeof window['cordova'] !== 'undefined') {
  document.addEventListener('deviceready', () => {
    bootstrap();
  }, false);
} else {
  bootstrap();
}

cordova platform add android
cordova run android

ng g service Cordova


import { Injectable,NgZone } from ‘@angular/core’;
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

function _window(): any {
 // return the global native browser window object
 return window;
}
@Injectable()
export class CordovaService {
   
   private resume: BehaviorSubject<boolean>;
   constructor(private zone: NgZone) {
      this.resume = new BehaviorSubject<boolean>(null);
      Observable.fromEvent(document, 'resume').subscribe(event => {
         this.zone.run(() => {
            this.onResume();
         });
      });
    }
   
   get cordova(): any {
      return _window().cordova;
   }
   get onCordova(): Boolean {
    return !!_window().cordova;
    }
   public onResume(): void {
      this.resume.next(true);
   }
}







