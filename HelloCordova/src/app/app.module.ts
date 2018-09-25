import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { ROUTES } from './app.routes';
import { CameraComponent } from './camera/camera.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { CodebarComponent } from './codebar/codebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    CameraComponent,
    GeolocationComponent,
    CodebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
