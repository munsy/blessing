import { Component, OnInit } from '@angular/core';

import { OverlayService } from '../../providers/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  overlay = true;

  constructor(private overlayService: OverlayService) { }

  ngOnInit() { }

  public enableOverlay() {
    this.overlayService.overlayOn();
  	this.overlay = true;
  }

  public disableOverlay() {
    this.overlayService.overlayOff();
  	this.overlay = false;
  }
}
