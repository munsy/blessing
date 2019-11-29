import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private router: Router) {
    console.log('Loading Cure UI...');
    console.log(this.router.url);
    console.log(window.location.href);
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    //if(!window.localStorage.getItem('endpoints') ) {
    //  alert('No endpoints detected! Going home...');
    //  this.router.navigate(['home']);
    //} else {
    //  alert('Launching overlay...');
    //  this.router.navigate(['overlay']);
    //}
  }
}
