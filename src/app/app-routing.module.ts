import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddonsComponent } from './components/addons/addons.component';
import { OverlayComponent } from './components/overlay/overlay.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'addons',
        component: AddonsComponent
    },
    {
        path: 'overlay',
        component: OverlayComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
