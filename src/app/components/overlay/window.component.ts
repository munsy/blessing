import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { OverlayService } from '../../providers/overlay.service';

@Component({
  selector: 'overlay-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class OverlayWindowComponent implements OnInit {
  public overlay: boolean = false;
  public locked: boolean = true;
  public testMsg: string = "test message!";

  constructor(private overlayService: OverlayService,
              private router: Router,
              @Inject(DOCUMENT) private document: any) {
    console.log(window.location.href);
    console.log(this.router.url);
    console.log(this.testMsg);
  }

  currentRoute(): string {
    return window.location.href;
    //return this.router.url;
  }

  ngOnInit() { 
    //this.document.html.style = 'background: none !important;background-color: rgba(0,0,0,0);';
    this.document.body.style = 'background-image: none !important;background: none !important;background-color: rgba(0,0,0,0);';
  }
}