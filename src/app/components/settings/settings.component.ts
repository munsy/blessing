import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElectronService } from '../../providers/electron.service';
import { CureSettings } from '../../models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public installLocation: string;
  public title: string;
  public devEnabled: boolean;
  public settings: CureSettings;

  constructor(private es: ElectronService) {
    this.settings = new CureSettings();
    this.settings.FFXIVFolder = "C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn\\game";
  }

  ngOnInit() {
    this.settings = new CureSettings();
    this.settings.FFXIVFolder = "C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn\\game";
  }

  save() {
    alert(this.settings.FFXIVFolder);
  }

  devMode() {
    this.es.developer();
    this.settings.DeveloperMode = !this.settings.DeveloperMode;
  }
}
