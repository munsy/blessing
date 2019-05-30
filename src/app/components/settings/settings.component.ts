import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public installLocation: string;
  public title: string;

  constructor() {
    this.title = "Settings";
  	this.installLocation =  = "C:\\Users\\Munsy\\Cure";
  }

  ngOnInit() { }
}
