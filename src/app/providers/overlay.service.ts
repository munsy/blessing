import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private ipc: IpcRenderer

  constructor(private router: Router) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Could not load electron ipc')
    }
  }

  async on(event: string, callback: any) {
    this.ipc.on(event, () => {
      return callback;
    });
  } 

  async unlock() {
    return new Promise<boolean>((resolve, reject) => {
      this.ipc.send("overlayUnlock");
    });
  }

  async lock() {
    return new Promise<boolean>((resolve, reject) => {
      this.ipc.send("overlayLock");
    });
  }

  async overlayOn() {
    return new Promise<boolean>((resolve, reject) => {
      //this.ipc.once("overlayOnResponse", (event, arg) => {
      //  resolve(arg);
      //});
      this.ipc.send("overlayOn");
    });
  }
  
  async overlayOff() {
    return new Promise<boolean>((resolve, reject) => {
      //this.ipc.once("overlayOffResponse", (event, arg) => {
      //  resolve(arg);
      //});
      this.ipc.send("overlayOff");
    });
  }
}
