import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  public update: boolean = false;
  
  constructor(private es: ElectronService,
    private router: Router) { 
  }

  ngOnInit() { }

  back() {
    this.router.navigate(['/']);
  }
}
