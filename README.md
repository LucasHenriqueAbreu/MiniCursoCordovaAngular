1 Criando o projeto Angular
ng new HellowCordova

2 Adicionando o framework de design angular material
ng add @angular/material

3 Criando um navbar
ng generate @angular/material:material-nav --name myNav

4 Adicionando o no componente principal
<app-my-nav></app-my-nav>

5 Criando os outros 3 componentes
ng g c camera
ng g c geolocation
ng g c codebar

6 Criando o arquivo de rotas
touch app.routes.ts

import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: 'camera', component: CameraComponent },
    // { path: 'geolocation', component: GeolocationComponent },
    // { path: 'codebar', component: CodebarComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

8 Importar o arquivo de rotas no modulo principal do projeto.

imports: [
  ...
   ROUTES
  ...
],
9 Chamada das telas.
<a mat-list-item [routerLink]="['/camera']">camera 1</a>
<a mat-list-item [routerLink]="['/geolocation']">geolocation 2</a>
<a mat-list-item [routerLink]="['/codebar']">codebar 3</a>
...
<router-outlet></router-outlet>

--->> Cordova

npm install -g cordova
cordova create HelloCordovaMobileApp com.utfpr.edu "HelloCordovaMobileApp"

cd HelloCordovaMobileApp
cordova platform add browser
cordova run browser

rm -rf /www

ng build --prod --base-href . --output-path ../HelloCordovaMobileApp/www/

<script type="text/javascript" src="cordova.js"></script>

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

Adicionando os plugins ao projeto
cordova plugin add cordova-plugin-barcodescanner
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-geolocation


ng g service Cordova

import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Observer, observable } from 'rxjs';



function _window(): any {
    // return the global native browser window object
    return window;
}
@Injectable()
export class CordovaService {

    private resume: BehaviorSubject<boolean>;
    constructor(private zone: NgZone) {
        this.resume = new BehaviorSubject<boolean>(null);
        fromEvent(document, 'resume').subscribe(event => {
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


    public openScanner(): Observable<any> {
        return Observable.create((observer: Observer<string>) => {
            _window().cordova.plugins.barcodeScanner.scan(
                function (result) {
                    observer.next(result);
                },
                function (error) {
                    observer.error(error);
                },
                {
                    preferFrontCamera: false, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt: "Coloque um código de barras dentro da área de digitalização", // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats: "QR_CODE,PDF_417, EAN_13", // default: all but PDF_417 and RSS_EXPANDED
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
            )
        });
    }

    public getLocation(): Observable<any> {
        return Observable.create((observer: Observer<string>) => {
            _window().navigator.geolocation.getCurrentPosition(
                function (result) {
                    observer.next(result);
                },
                function (error) {
                    observer.error(error);
                },
                { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
            )
        });
    }


    public openCamera(): Observable<any> {
        return Observable.create((observer: Observer<string>) => {
            _window().navigator.camera.getPicture((result) => {
                alert(result);
                observer.next(result);
            }, (error) => {
                observer.error(error);
            });
        });
    }
}

providers: [
  ...
   CordovaService
  ...
],


Teste:
cordova platform add android@6.3.0
cordova run android