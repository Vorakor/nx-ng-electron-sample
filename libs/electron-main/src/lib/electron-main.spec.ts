import { electronMain } from './electron-main';

describe('electronMain', () => {
  it('should work', () => {
    expect(electronMain()).toEqual('electron-main');
  });
});
