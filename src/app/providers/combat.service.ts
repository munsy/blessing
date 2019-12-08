import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private ipc: IpcRenderer

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
  }

  public on(channel: string, listener: Function): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this.ipc) {
      return;
    }
    this.ipc.send(channel, ...args);
  }
  
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

  async sendTestMessage(msg: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.ipc.send("overlay", {case: "test", arg: msg});
    });
  }
}
