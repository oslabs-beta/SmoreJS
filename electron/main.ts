import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: Electron.BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:4000`);
  } 
  // else {
  //   win.loadURL(
  //     url.format({
  //         pathname: path.join(__dirname, '../index.html'),
  //         protocol: 'file:',
  //         slashes: true
  //     })
  //   );
  // }
  
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;