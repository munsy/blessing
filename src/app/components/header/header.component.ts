import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgLogo = "../../../assets/images/cure-mini.jpg"
  constructor(private es: ElectronService) { }
  ngOnInit() { }
  quit() {
  	console.log('test')
  	this.es.quit();
  }
  minimize() {
  	this.es.minimize();
  }
}
