import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgLogo = "../../../assets/images/cure-mini.jpg"
  constructor() { }
  ngOnInit() { }
}
