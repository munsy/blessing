import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-act',
  templateUrl: './act.component.html',
  styleUrls: ['./act.component.scss']
})
export class ActComponent implements OnInit {
  public actInstalled = true
  public installLocation = "C:\\Users\\Munsy\\Cure\\ACT"

  constructor() {
  	
  }

  ngOnInit() { }
}
