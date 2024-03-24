const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const electron = require("electron");
const { join } = require('path');
const autoUpdater = require("electron-updater").autoUpdater;
const os = require('os');
const fs = require('fs');
const informations = require('./package.json');
require('dotenv-defaults/config');
const axios = require('axios');
const log = require('electron-log')
const isDev = import('electron-is-dev')

/* Only one application */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
}

autoUpdater.on('update-not-available', () => {
  log.info('현재 최신버전입니다.');
  mainWindow.webContents.send('update-not-available');
  console.log('had sent')
});

autoUpdater.on('update-available', () => {
  log.info('업데이트가 가능합니다.');
  mainWindow.webContents.send('update-available');
});

autoUpdater.on('download-progress', (progressObj) => {
  log.info(`다운로드 중: ${progressObj.percent}%`);
  mainWindow.webContents.send('download-progress', progressObj.percent);
});

autoUpdater.on('update-downloaded', () => {
  log.info('업데이트 다운로드가 완료되었습니다.');
  mainWindow.webContents.send('update-downloaded');
  
});

ipcMain.on('restartApp', () => {
  autoUpdater.quitAndInstall();
});
ipcMain.on('restartApps', () => {
  app.relaunch()
  app.exit(0)
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    darkTheme: true,
    transparent: true,
    width: 1280,
    height: 720,
    resizable: false,
    icon: 'app/assets/media/icon.ico',
    title: getAppName(),
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: join(__dirname, 'preload.js')
    }
  });
  
  _menu(mainWindow);
  _informations();
  _titlebar(mainWindow);
  _theme();
  mainWindow.loadFile(join(__dirname, 'app/index.html'));
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  autoUpdater.checkForUpdates()
}


function getAppName() {
  if (process.env.formatName) {
    let name = informations.name.split('-');
    for (let index = 0; index < name.length; index++) name[index] = name[index][0].toUpperCase() + name[index].toLowerCase().substring(1);
    return name.join(' ');
  }
  return informations.name;
}

function _menu(window) {
  const menu = [
    {
      label: 'tools',
      submenu: [
        { label: 'reload', accelerator: 'CmdOrCtrl+R', click() { window.webContents.reload(); } },
        { label: 'reload and clear cache', accelerator: 'CmdOrCtrl+Shift+R', click() { window.webContents.reloadIgnoringCache(); } },
        {
          label: 'developer tools', accelerator: 'CmdOrCtrl+Shift+I', click() {
            window.webContents.isDevToolsOpened() || window.webContents.isDevToolsFocused() ? window.webContents.closeDevTools() : window.webContents.openDevTools();
          }
        },
        { label: 'fullscreen', accelerator: 'F11', click() { window.isFullScreen() ? window.setFullScreen(false) : window.setFullScreen(true); } }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
}

function _informations() {
  ipcMain.handle('informations:os', () => {
    return new Promise((resolve, reject) => {
      resolve(os.platform());
    });
  });
  ipcMain.handle('informations:app:name', () => {
    return new Promise((resolve, reject) => {
      resolve(getAppName());
    });
  });
  ipcMain.handle('informations:app:description', () => {
    return new Promise((resolve, reject) => {
      resolve(informations.description);
    });
  });
}

function _titlebar(window) {
  ipcMain.handle('titlebar:close', () => {
    window.close();
  });
  ipcMain.handle('titlebar:minimize', () => {
    window.minimize();
  });
  ipcMain.handle('titlebar:fullscreen', () => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
  });
  ipcMain.handle('titlebar:isFullscreen', () => {
    return window.isMaximized();
  });
}

function _theme() {
  ipcMain.handle('theme:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) nativeTheme.themeSource = 'light';
    else nativeTheme.themeSource = 'dark';
    return nativeTheme.shouldUseDarkColors;
  });
  ipcMain.handle('theme:light', () => {
    nativeTheme.themeSource = 'light';
  });
  ipcMain.handle('theme:dark', () => {
    nativeTheme.themeSource = 'dark';
  });
}

const appDataRoamingPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : '/var/local');
const classProgramPath = join(appDataRoamingPath, '.classprogram');

if (!fs.existsSync(classProgramPath)) {
  fs.mkdirSync(classProgramPath);
  console.log('.classprogram created');
} else {
  console.log('.classprogram already exists');
}

const settingsFilePath = join(classProgramPath, 'settings.json');
if (!fs.existsSync(settingsFilePath)) {
  fs.writeFileSync(settingsFilePath, '{}');
  console.log('settings.json created');
} else {
  console.log('settings.json already exists');
}

const userAccountName = os.userInfo().username;

const jsonFilePath = join(process.env.APPDATA, '.classprogram', 'settings.json');

function updateSettingsFile(newValue) {
  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('An error occurred while reading the JSON file.', err);
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData.class = newValue;
    let updatedData = JSON.stringify(jsonData);

    fs.writeFile(jsonFilePath, updatedData, 'utf-8', (err) => {
      if (err) {
        console.error('An error occurred while updating the JSON file.', err);
        return;
      }
      console.log('The JSON file has been updated.');
    });
  });
}
app.disableHardwareAcceleration();
app.whenReady().then(() => {
  createWindow();
}).catch((error) => {
  console.error(error);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
