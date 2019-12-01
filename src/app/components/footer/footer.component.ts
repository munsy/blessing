import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  private version: any;
  private status: number;

  constructor(private es: ElectronService) {
  	this.version = {
  		major: 0,
  		minor: 1,
  		patch: 0,
  		prerelease: 'alpha',
  		metadata: 'memtest.1'
  	};
  	this.status = 1;
  }

  ngOnInit() { 
  	this.status = 0;
  }
  
  public getVersion(): string {
  	var v = this.version.major.toString() 
  	+ '.' + this.version.minor.toString() 
  	+ '.' + this.version.patch.toString();
  	if(this.version.prerelease != '') {
  		v += '-' + this.version.prerelease;
  	}
  	if(this.version.metadata != '') {
  		v += '+' + this.version.metadata;
  	}
  	return v;
  }

  public getStatusIcon(): number {
  	return this.status;
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
