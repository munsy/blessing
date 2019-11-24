import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private ipc: IpcRenderer

  constructor() {
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

  async overlayOn() {
    return new Promise<boolean>((resolve, reject) => {
      this.ipc.once("overlayOnResponse", (event, arg) => {
        resolve(arg);
      });
      this.ipc.send("overlayOn");
    });
  }
  
  async overlayOff() {
    return new Promise<boolean>((resolve, reject) => {
      this.ipc.once("overlayOffResponse", (event, arg) => {
        resolve(arg);
      });
      this.ipc.send("overlayOff");
    });
  }
}
