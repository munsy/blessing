import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private ipc: IpcRenderer
  private locked: boolean;
  private enabled: boolean;

  constructor(private router: Router) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
    this.locked = true;
    this.enabled = false;
    this.ipc.on('unlock-overlay', () => {
      this.locked = false;
    });
    this.ipc.on('lock-overlay', () => {
      this.locked = true;
    });
  }

  //async on(event: string, callback: Function) {
  //  this.ipc.on(event, callback);
  //} 

  getWindowId(): any {
    if ((<any>window).require) {
      try {
        return (<any>window).require('electron').remote.getCurrentWindow().id;
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isLocked(): boolean {
    return this.locked;
  }

  async unlock() {
    return new Promise<boolean>((resolve, reject) => {
      this.locked = false;
      this.ipc.send("unlock-overlay");
    });
  }

  async lock() {
    return new Promise<boolean>((resolve, reject) => {
      this.locked = true;
      this.ipc.send("lock-overlay");
    });
  }

  async overlayOn() {
    return new Promise<boolean>((resolve, reject) => {
      this.enabled = true;
      this.ipc.send("overlayOn");
    });
  }
  
  async overlayOff() {
    return new Promise<boolean>((resolve, reject) => {
      this.enabled = false;
      this.ipc.send("overlayOff");
    });
  }
}
