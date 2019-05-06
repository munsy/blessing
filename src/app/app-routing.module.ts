import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ActComponent } from './components/act/act.component';
import { AddonsComponent } from './components/addons/addons.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'act',
        component: ActComponent
    },
    {
        path: 'addons',
        component: AddonsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
