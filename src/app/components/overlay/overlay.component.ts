import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  overlay = true;

  constructor() { }

  ngOnInit() { }

  public enableOverlay() {
  	this.overlay = true;
  }

  public disableOverlay() {
  	this.overlay = false;
  }
}
