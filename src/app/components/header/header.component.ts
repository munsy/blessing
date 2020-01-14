import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgLogo = "assets/images/blessing-mini.jpg"
  constructor(private es: ElectronService) { }
  ngOnInit() { }
  quit() {
  	this.es.quit();
  }
  minimize() {
  	this.es.minimize();
  }
}
