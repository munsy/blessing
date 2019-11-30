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
  public testMessage: string;

  constructor(private overlayService: OverlayService) { }

  ngOnInit() { 
    if(this.overlayService.isEnabled()) {
      this.overlayService.overlayOn();
      if(this.overlayService.isLocked()) {
        this.overlayService.lock();
      } else {
        this.overlayService.unlock();
      }
    } else {
      this.overlayService.overlayOff();
    }
  }

  private enableOverlay() {
    this.overlayService.overlayOn();
  }

  private disableOverlay() {
    this.overlayService.overlayOff();
  }

  public sendTest() {
    this.overlayService.sendTestMessage(this.testMessage);
  }

  public id(): any {
    return this.overlayService.getWindowId();
  }

  public isLocked(): boolean {
    return this.overlayService.isLocked();
  }

  public isEnabled(): boolean {
    return this.overlayService.isEnabled();
  }

  public lock() {
    if(this.overlayService.isLocked()) {
      this.overlayService.unlock();
    } else {
      this.overlayService.lock();
    }
  }

  public switch() {
    if(this.overlayService.isEnabled()) {
      this.disableOverlay();
    } else {
      this.enableOverlay();
    }
  }
}
