import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private version: string;
  private status: number;

  constructor(private es: ElectronService) {
  	this.version = '0.0.1';
  	this.status = 0;
  }

  ngOnInit() { }
  
  public getVersion(): string {
  	return this.version;
  }

  public getStatus(): string {
  	switch(this.status) {
      case 0:
        return 'Everything is up-to-date!';
      case 1:
        return 'Checking for updates...';
      case 2:
        return 'An update is available!';
      case 3:
        return 'An error occurred while checking for updates...';
    }
  }

}
