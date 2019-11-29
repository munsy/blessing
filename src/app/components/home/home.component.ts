import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ElectronService } from '../../providers/electron.service';
import { OverlayService } from '../../providers/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private option: number;

  online = true;
  imgLogo = "../../../assets/images/cure-mini.png";

  constructor(private es: ElectronService,
    private overlayService: OverlayService,
    private router: Router) {
  	this.option = 0;
    
    this.overlayService.on('load-overlay', () => {
      alert('test');
      this.router.navigate(['overlay']);
    });
  }

  currentRoute(): string {
    return window.location.href;
    //return this.router.url;
  }

  ngOnInit() {
  	this.option = 0;
    this.overlayService.on('load-overlay', () => {
      alert('test');
      this.router.navigate(['overlay']);
    });
  }

  website() {
    this.es.launchBrowser();
  }

  dash() {
  	this.option = 0;
  }

  settings() {
  	this.option = 1;
  }
  
  addons() {
  	this.option = 2;
  }
  
  overlay() {
  	this.option = 3;
  }
}
