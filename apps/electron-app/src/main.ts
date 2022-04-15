/* eslint-disable @typescript-eslint/no-explicit-any */
import { app, BrowserWindow, ipcMain } from 'electron';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import 'reflect-metadata';
import { ReflectiveInjector } from '@cricut/core-logic';
import { homedir } from 'os';
import { join } from 'path';

let mainWindow: Electron.BrowserWindow | null;

export function electronMain(): void {
  const createWindow = () => {
    setTimeout(() => {
      mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        // webPreferences: {
        //   preload: './preload.js',
        // },
      });
      mainWindow.loadURL('http://localhost:4200');
      // Another option for loading the web-based app in the background
      // mainWindow.loadFile(
      //   join(homedir(), 'dist/apps/ele-sample/index.html')
      // );
      mainWindow.webContents.openDevTools();
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }, 10000);
  };

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

type ServerCallback = (...args: any[]) => any;

interface IClientChannel {
  handle(messageType: string, callback: ServerCallback): IClientChannel;
  on(channel: string, callback: ServerCallback): IClientChannel;
  removeAllListeners(channel: string): IClientChannel;
  once(messageType: string, callback: ServerCallback): IClientChannel;
}

const ICLIENTCHANNEL = new InjectionToken<IClientChannel>('iclientchannel');

interface ISender {
  send(channel: string, ...args: any[]): void;
}

@Injectable()
class ElectronClientChannel implements IClientChannel {
  handle(messageType: string, callback: ServerCallback): IClientChannel {
    ipcMain.handle(messageType, callback);
    return this;
  }
  on(channel: string, callback: ServerCallback): IClientChannel {
    ipcMain.on(channel, callback);
    return this;
  }
  removeAllListeners(channel: string): IClientChannel {
    ipcMain.removeAllListeners(channel);
    return this;
  }
  once(messageType: string, callback: ServerCallback): IClientChannel {
    ipcMain.once(messageType, callback);
    return this;
  }
}

class ElectronWebContentsSender implements ISender {
  constructor(private _webContents: Electron.WebContents) {}

  public send(channel: string, ...args: any[]): void {
    this._webContents.send(channel, ...args);
  }
}

@Injectable()
class EchoPlugin {
  constructor(
    @Inject(ICLIENTCHANNEL) private readonly _channel: IClientChannel
  ) {
    this._channel.handle(
      'echo',
      (_inEvent: Electron.IpcMainInvokeEvent, message: string) => {
        return message;
      }
    );
  }
}

ReflectiveInjector.resolveWith(ICLIENTCHANNEL, ElectronClientChannel);
ReflectiveInjector.resolveAndCreate([EchoPlugin]);
ReflectiveInjector.get(EchoPlugin);
