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