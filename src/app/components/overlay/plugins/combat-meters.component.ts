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
  
  //private center = $(window).scrollTop() + $(window).height() / 2;
  
  constructor(private cs: CombatService,
              private ref: ChangeDetectorRef) {
    this.draggable = false;
    this.noOp = 0;
    this.sleepy = 0;

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
    this.draggable = false;
  }
}
