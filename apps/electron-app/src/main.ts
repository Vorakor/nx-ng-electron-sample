/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ipcMain } from 'electron';
import { ReflectiveInjector } from './reflective-injector';
import { createWindow } from '../electron-main';

type ServerCallback = (...args: any[]) => any;

interface IClientChannel {
  handle(messageType: string, callback: ServerCallback): IClientChannel;
  on(channel: string, callback: ServerCallback): IClientChannel;
  removeAllListeners(channel: string): IClientChannel;
  once(messageType: string, callback: ServerCallback): IClientChannel;
}

const ICLIENTCHANNEL = new InjectionToken<IClientChannel>('iclientchannel');

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

createWindow();
