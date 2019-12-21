import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CombatService } from '../../../providers/combat.service';

@Component({
  selector: 'combat-meters',
  templateUrl: './combat-meters.component.html',
  styleUrls: ['./combat-meters.component.scss']
})
export class CombatMetersComponent implements OnInit {
  public draggable: boolean;
  public fromMain: string;
  public noOp: number;
  public sleepy: number;
  
  public pos1: number;
  public pos2: number;
  public pos3: number;
  public pos4: number;

  public anchor: HTMLElement;

  //private center = $(window).scrollTop() + $(window).height() / 2;
  mouseDown = (ev: MouseEvent) => {
    window.addEventListener("mousemove", this.mouseMove);
    ev.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = ev.clientX;
    this.pos4 = ev.clientY;
    //document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    //document.onmousemove = this.elementDrag;
  }
  mouseUp = (ev: MouseEvent) => {
    window.removeEventListener("mousemove", this.mouseMove);
  }
  mouseMove = (ev: MouseEvent) => {
    ev.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - ev.clientX;
    this.pos2 = this.pos4 - ev.clientY;
    this.pos3 = ev.clientX;
    this.pos4 = ev.clientY;
    // set the element's new position:
    this.anchor.style.top = (this.anchor.offsetTop - this.pos2) + "px";
    this.anchor.style.left = (this.anchor.offsetLeft - this.pos1) + "px";
  }
  
  constructor(private cs: CombatService, private ref: ChangeDetectorRef) {
    this.draggable = false;
    this.noOp = 0;
    this.sleepy = 0;
 
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;

    this.anchor = document.getElementById("cure-combat-meters") as HTMLElement;

    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);


    this.cs.on('combat', (event, args) => {
      switch(args.case) {
        case 'update':
          this.fromMain = args.arg;
          break;
        case 'drag':
          if(args.arg == 'on') {
            this.draggable = true;
          } else {
            this.draggable = false;
          }
          break;
        case 'sleepy':
          this.sleepy = args.arg;
          break;
        default:
          this.noOp++;
          break;
      }
      this.ref.detectChanges();
    });
  }
  
  ngOnInit() {
    this.pos1 = 0;
    this.pos2 = 0;
    this.pos3 = 0;
    this.pos4 = 0;
    this.anchor = document.getElementById("cure-combat-meters") as HTMLElement;
    this.draggable = false;
  }
}
/*
  setDraggable() {
    this.draggable = true;
    //this.anchor.setAttribute("style", "-webkit-app-region: drag");
    this.dragElement();
  }

  dragElement() {
    if (document.getElementById(this.anchor.id + "-header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(this.anchor.id + "-header").onmousedown = this.dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      this.anchor.onmousedown = this.dragMouseDown;
    }
  }

  dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    document.onmouseup = this.closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = this.elementDrag;
  }

  elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    this.anchor.style.top = (this.anchor.offsetTop - this.pos2) + "px";
    this.anchor.style.left = (this.anchor.offsetLeft - this.pos1) + "px";
  }

  closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/

/*
dragElement(document.getElementById("mydiv"));

function dragElement(this.anchor) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(this.anchor.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(this.anchor.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    this.anchor.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    this.anchor.style.top = (this.anchor.offsetTop - pos2) + "px";
    this.anchor.style.left = (this.anchor.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/