import { Component, OnInit } from '@angular/core';

import { OverlayService } from '../../providers/overlay.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  public overlay: boolean = false;
  public locked: boolean = true;

  constructor(private overlayService: OverlayService) { }

  ngOnInit() { }

  private enableOverlay() {
    this.overlayService.overlayOn();
  	this.overlay = true;
  }

  private disableOverlay() {
    this.overlayService.overlayOff();
  	this.overlay = false;
  }

  public lock() {
    if(this.locked) {
      this.overlayService.unlock();
      this.locked = false;
    } else {
      this.overlayService.lock();
      this.locked = true;
    }
  }

  public switch() {
    if(this.overlay) {
      this.disableOverlay();
    } else {
      this.enableOverlay();
    }
  }
}
