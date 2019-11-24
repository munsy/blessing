import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
  imgLogo = "../../../assets/images/cure-mini.jpg"
  constructor(private es: ElectronService) { }
  ngOnInit() { }
  quit() {
  	this.es.quit();
  }
  minimize() {
  	this.es.minimize();
  }
}
