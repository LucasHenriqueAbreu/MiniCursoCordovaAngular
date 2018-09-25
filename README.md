Como você deve ter visto, o Cordova permite criar aplicações híbridas para diferentes plataformas mobile com base no componente WebView. 
Este funciona como um browser, mas sem aquela barra de endereço ou botões para o usuário. Por ele apenas visualizamos os dados.

O Cordova usa apenas HTML, CSS e JavaScript, então o desenvolvedor web que já utiliza essas linguagens pode aproveitar todo o conhecimento e alcançar novos públicos,
pois suas aplicações usarão recursos nativos dos dispositivos mobile, como ilustrado na Figura 1.


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



PWA ---
PWA, de forma curta e grossa, são técnicas de desenvolvimento que combinam o que tem de melhor em aplicações Web e o melhor dos aplicativos. O usuário não tem a necessidade de realizar uma instalação. Quanto mais o app é acessado pelo usuário, ele se torna mais rápido mesmo utilizando a rede de dados móveis que às vezes não funciona direito. É possível enviar notificações, possui atalho na home e é carregado como um aplicativo.


Progressivo — É possível ser acessado em qualquer dispositivo e qualquer navegador, este é um princípio fundamental.
Responsivo -Deve ser possível utilizar em qualquer tamanho: desktop, celular, tablet.
Independente de conectividade — Utilizando dos service workers para trabalhar off-line ou em redes de baixa qualidade.
Semelhante a aplicativos — Deve ser famíliarizado, parecer com aplicativos, com interações e navegação de estilo de aplicativos, utilizando o modelo de shell de aplicativo.
Atual — O service worker possui um processo de atualização muito importante que deve ser utilizado.
Seguro — Sempre deve ser utilizado certificados HTTPS, garantindo a segurança das informações.
Descobrível — Utilizando os manifestos do W3C e o escopo de registro do service worker, é possível ser encontrado por mecanismos de pesquisa que podem identificar a aplicação como “aplicativo”
Reenvolvente — É possível utilizar notificações para engajar o uso.
Instalável — Podem ser armazenados na home do usuário para facilitação no acesso.
Linkável — Compartilhável via URL, não requer instalação complexa.


Segurança

git add .
git commit -m "Commit inicial"
git remote add origin https://github.com/{usuário}/{nome do repositório}.git
git push origin master

ng build --prod --base-href /HelloCordovaMobileApp/

npm i -g angular-cli-ghpage
ngh

Shell
<noscript>
  <h3 style="color:#3f51b5; font-family: Helvetica; margin: 2rem;">
      Aplicativo indisponível sem javascript.
  </h3>
</noscript>

O manifesto:
Ter uma presença avançada na tela inicial do Android do usuário
Ser iniciado no modo de tela inteira no Android sem uma barra de URL
Controlar a orientação da tela para proporcionar uma visualização ideal
Definir uma experiência de inicialização com “tela de apresentação” e uma cor de tem para o site
Acompanhar se o aplicativo foi iniciado da tela inicial ou da barra de URL

Service Worker


ng add  @angular/pwa --project HelloCordovaMobileApp

// package.json
...
"@angular/service-worker": "6.0.0",
...

// src/app/app.module.ts
...
ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
...

// index.html
...
  <meta name="theme-color" content="#3f51b5">
  <link rel="manifest" href="manifest.json">
...
