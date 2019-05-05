import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-installed',
  templateUrl: './installed.component.html',
  styleUrls: ['./installed.component.scss']
})
export class InstalledComponent implements OnInit {
  public items: Array<string>;
  public actInstalled = true
  public installLocation = "C:\\Users\\Munsy\\Cure\\ACT"

  constructor() {
  	let a1 = {}
  	a1.icon = "a1_ICON"
  	a1.addonName = "Raider.IO Mythic Plus and Raid Progress"
  	a1.needsUpdate = false
  	a1.recentlyUpdated = false
  	a1.latestVersion = "RaiderIO-v201904030600.zip"
  	a1.gameVersion = "8.1.5"
  	a1.author = "sandalpunk"

  	let a2 = {}
  	a2.icon = "a2_ICON"
  	a2.addonName = "Cool Addon Plus"
  	a2.needsUpdate = false
  	a2.recentlyUpdated = false
  	a2.latestVersion = "capv1.1.1.1.0-1232133alphalolbuild.zip"
  	a2.gameVersion = "8.1.0"
  	a2.author = "somedudelolxoxo"

  	let a3 = {}
  	a3.icon = "a3_ICON"
  	a3.addonName = "CureBragger"
  	a3.needsUpdate = true
  	a3.recentlyUpdated = false
  	a3.latestVersion = "CureBragger-3.1.4a-release.zip"
  	a3.gameVersion = "8.1.5"
  	a3.author = "munsy"

  	let a4 = {}
  	a4.icon = "a4_ICON"
  	a4.addonName = "ErrDemo"
  	a4.needsUpdate = true
  	a4.recentlyUpdated = true
  	a4.latestVersion = "ErrDemo-1.0-release.zip"
  	a4.gameVersion = "8.1.5"
  	a4.author = "munsy"

    this.addons = [a1, a2, a3, a4]
  }

  ngOnInit() { }
}
