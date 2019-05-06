import { Component, OnInit } from '@angular/core';

import { Addon } from '../../addon';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  styleUrls: ['./addons.component.scss']
})
export class AddonsComponent implements OnInit {
  public addons: Array<Addon>;
  public actInstalled = true
  public installLocation = "C:\\Users\\Munsy\\Cure\\ACT"

  constructor() {
  	this.addons = [
  		new Addon("a1_ICON", "Raider.IO Mythic Plus and Raid Progress", false, false, "RaiderIO-v201904030600.zip", "8.1.5", "sandalpunk"),
  		new Addon("a2_ICON", "Cool Addon Plus", false, false, "capv1.1.1.1.0-1232133alphalolbuild.zip", "8.1.0", "somedudelolxoxo"),
  		new Addon("a3_ICON", "CureBragger", true, false, "CureBragger-3.1.4a-release.zip", "8.1.5", "munsy"),
		new Addon("a4_ICON", "ErrDemo", true, true, "ErrDemo-1.0-release.zip", "8.1.5", "munsy"),
	]
  }

  ngOnInit() { }
}
