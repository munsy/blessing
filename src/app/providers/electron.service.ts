import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {
  private _ipc: IpcRenderer | undefined = void 0;
  //ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this._ipc = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
  }

  public on(channel: string, listener: Function): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
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

  async testOverlay(msg?: string) {
    msg = msg ? msg : "default string";
    this._ipc.send("overlay-test", msg);
  }

  async getDir(path: string) {
    return await new Promise<string>((resolve, reject) => {
      this._ipc.once("get-ffxiv-dir-response", (event, arg) => {
        resolve(arg);
      }); 
      this._ipc.send("get-ffxiv-dir", path);
    });
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  launchBrowser() {
    this._ipc.send("launchBrowser");
  }

  minimize() {
    this._ipc.send("minimizeMain");
  }

  quit() {
    this._ipc.send("quitProgram");
  }

  developer() {
    this._ipc.send("devMode");
  }
}
