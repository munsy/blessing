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
  private statusMessage: string;
  private statusIcon: number; // 0 = loading, 1 - up to date, 2 = update available, 3 = error

  online = true;
  imgLogo = "assets/images/blessing-mini.png";

  constructor(private es: ElectronService,
    private overlayService: OverlayService,
    private router: Router) {
  	this.option = 0;
    this.statusIcon = 1;
  }

  ngOnInit() {
  	this.option = 0;
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
