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
  public settings: CureSettings;

  constructor(
    private es: ElectronService
  ) {
    this.settings = new CureSettings();
  }

  ngOnInit() {
    this.settings = new CureSettings();
  }

  async selectFFXIVDir() {        
    return await this.es.getDir(this.settings.FFXIVFolder).then((path) => {
      this.settings.FFXIVFolder = path.toString();
    });
  }

  save() {
    alert(this.settings.FFXIVFolder);
    alert(this.settings.DeveloperMode);
  }

  devMode() {
    this.es.developer();
    this.settings.DeveloperMode = !this.settings.DeveloperMode;
  }
}
