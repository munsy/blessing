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
  public locked: boolean;
  private count: number;
  public debug: string;

  constructor(private readonly es: ElectronService,
              private router: Router,
              private ref: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: any) {
    this.count = 0;
    this.locked = true;
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
    
    //this.es.on('unlock-overlay', () => {
    //  this.testMsg = 'unlock-overlay';
    //  if(this.locked === undefined) {
    //    this.locked = false;
    //  }
    //  this.locked = false;
    //  this.ref.detectChanges();
    //});
    //this.es.on('lock-overlay', () => {
    //  this.testMsg = 'lock-overlay';
    //  if(this.locked === undefined) {
    //    this.locked = true;
    //  }
    //  this.locked = true;
    //  this.ref.detectChanges();
    //});

    this.es.on('overlay', (event, args) => {
      switch(args.case) {
        case 'update':
          this.debug = args.arg;
          break;
        case 'lock':
          if(this.locked == undefined) {
            this.locked = true;
          }
          this.locked = true;
          this.setBgTransparent();
          break;
        case 'unlock':
          if(this.locked == undefined) {
            this.locked = false;
          }
          this.locked = false;
          this.setBgTranslucent();
          break;
        default:
          this.debug = 'default on ui';
          break;
      }
      this.ref.detectChanges();
    });
  }

  ngOnInit() {
    //this.locked = true;
    this.count = 0;
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
  }

  private setBgTransparent() {
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
  }

  private setBgTranslucent() {
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0.4);';
  }

  id(): any {
    return this.es.getWindowId();
  }

  isLocked(): boolean {
    return this.locked;
  }
}