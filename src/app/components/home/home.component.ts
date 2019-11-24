import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private option: number;

  online = true;
  imgLogo = "../../../assets/images/cure-mini.jpg";

  constructor() {
  	this.option = 0;
  }

  ngOnInit() {
  	this.option = 0;
  }

  main() {
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
