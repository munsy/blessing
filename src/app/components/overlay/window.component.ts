import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { OverlayService } from '../../providers/overlay.service';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'overlay-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class OverlayWindowComponent implements OnInit {
  public testMsg: string = "test message!";
  private locked: boolean;

  constructor(private readonly es: ElectronService,
              private router: Router,
              private ref: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: any) {
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
    
    this.es.on('unlock-overlay', () => {
      this.testMsg = 'unlock-overlay';
      if(this.locked === undefined) {
        this.locked = false;
      }
      this.locked = false;
      this.ref.detectChanges();
    });

    this.es.on('lock-overlay', () => {
      this.testMsg = 'lock-overlay';
      if(this.locked === undefined) {
        this.locked = true;
      }
      this.locked = true;
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    //this.locked = true;
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
  }

  id(): any {
    return this.es.getWindowId();
  }

  isLocked(): boolean {
    return this.locked;
  }
}