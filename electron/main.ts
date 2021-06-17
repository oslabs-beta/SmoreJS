import { app, BrowserWindow, protocol } from "electron";
import * as path from "path";
import * as url from "url";


let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    
  });
  mainWindow.loadURL(url.format({
    pathname: 'index.html',    /* Attention here: origin is path.join(__dirname, 'index.html') */
    protocol: 'file',
    slashes: true
  }))

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7);    /* all urls start with 'file://' */
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  })
  createWindow()
});
app.allowRendererProcessReuse = true;