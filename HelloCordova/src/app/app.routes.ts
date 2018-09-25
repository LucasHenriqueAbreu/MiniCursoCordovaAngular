import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from "./camera/camera.component";
import { GeolocationComponent } from "./geolocation/geolocation.component";
import { CodebarComponent } from "./codebar/codebar.component";

const routes: Routes = [
    { path: 'camera', component: CameraComponent },
    { path: 'geolocation', component: GeolocationComponent },
    { path: 'codebar', component: CodebarComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });