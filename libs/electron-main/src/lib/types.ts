/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcRenderer } from 'electron';

export type ClientCallback = (data?: any) => void;

export interface IServerChannel {
  invoke(type: string, ...args: any[]): Promise<any>;
  send(type: string, ...args: any[]): void;
  on(type: string, callback: ClientCallback): IServerChannel;
  once(type: string, callback: ClientCallback): IServerChannel;
}

export class ElectronServerChannel implements IServerChannel {
  invoke(messageType: string, ...args: any[]): Promise<any> {
    return ipcRenderer.invoke(messageType, ...args);
  }

  send(messageType: string, ...args: any[]): void {
    ipcRenderer.send(messageType, ...args);
  }

  on(channel: string, callback: ClientCallback): IServerChannel {
    ipcRenderer.on(channel, callback);
    return this;
  }

  once(channel: string, callback: ClientCallback): IServerChannel {
    ipcRenderer.once(channel, callback);
    return this;
  }
}
