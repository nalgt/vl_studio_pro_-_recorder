const { app, BrowserWindow, shell } = require('electron');
const lock = app.requestSingleInstanceLock();
if (!lock) { app.quit(); }
let win;
function createWindow() {
  win = new BrowserWindow({
    width:1280, height:800, minWidth:800, minHeight:400,
    title:"VL Studio Pro - Recorder", resizable:true, fullscreen:false, frame:true,
    backgroundColor:'#0a0a0a', show:false,
    webPreferences:{ nodeIntegration:false, contextIsolation:true, webSecurity:false }
  });
  win.loadFile('index.html');
  win.once('ready-to-show', () => { win.show(); });
  win.on('closed', () => { win = null; });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (!win) createWindow(); });
app.on('web-contents-created', (_,c) => {
  c.setWindowOpenHandler(({url}) => { if(url.startsWith('http')) shell.openExternal(url); return {action:'deny'}; });
});