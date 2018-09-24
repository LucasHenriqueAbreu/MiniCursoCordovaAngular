import { ModuleWithProviders } from "@angular/compiler/src/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: 'first-page', component: FirstPageComponent },
    // { path: 'second-page', component: SecondPageComponent },
    // { path: 'third-page', component: ThirdPageComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });