import { ipcMain, ipcRenderer } from 'electron';

type ServerCallback = (...args: any[]) => any;

interface IClientChannel {
  handle(messageType: string, callback: ServerCallback): IClientChannel;
  on(channel: string, callback: ServerCallback): IClientChannel;
  removeAllListeners(channel: string): IClientChannel;
  once(messageType: string, callback: ServerCallback): IClientChannel;
}

interface ISender {
  send(channel: string, ...args: any[]): void;
}

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

type ClientCallback = (data?: any) => void;

interface IServerChannel {
  invoke(type: string, ...args: any[]): Promise<any>;
  send(type: string, ...args: any[]): void;
  on(type: string, callback: ClientCallback): IServerChannel;
  once(type: string, callback: ClientCallback): IServerChannel;
}

class ElectronServerChannel implements IServerChannel {
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
