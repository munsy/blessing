import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { OnsenModule } from 'ngx-onsenui';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { OverlayService } from './providers/overlay.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { DashComponent } from './components/dash/dash.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddonsComponent } from './components/addons/addons.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { OverlayWindowComponent } from './components/overlay/window.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashComponent,
    SettingsComponent,
    OverlayComponent,
    OverlayWindowComponent,
    AddonsComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [ElectronService, OverlayService],
  bootstrap: [AppComponent]
})
export class AppModule { }

