import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpdateComponent } from './components/update/update.component';
import { AddonsComponent } from './components/addons/addons.component';
import { OverlayWindowComponent } from './components/overlay/window.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
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
        path: 'update',
        component: UpdateComponent
    },
    {
        path: 'overlay',
        component: OverlayWindowComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
