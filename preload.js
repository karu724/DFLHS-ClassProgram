const { remote, ipcRenderer } = require('electron');
const app = remote;

window.api = {
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data);
  }
};

window.versions = {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron
};

// Informations
window.informations = {
  os: () => window.api.invoke('informations:os'),
  appName: () => window.api.invoke('informations:app:name'),
  appDescription: () => window.api.invoke('informations:app:description')
};

// Titlebar
window.titlebar = {
  close: () => window.api.invoke('titlebar:close'),
  minimize: () => window.api.invoke('titlebar:minimize'),
  fullscreen: () => window.api.invoke('titlebar:fullscreen'),
  isFullscreen: () => window.api.invoke('titlebar:isFullscreen')
};

// Dark Mode
window.theme = {
  toggle: () => window.api.invoke('theme:toggle'),
  default: (theme = null) => (theme == 'dark' ? window.api.invoke('theme:dark') : window.api.invoke('theme:light'))
};

// Utils
window.utils = {
  existSync: (file) => require('fs').existsSync(require('path').join(__dirname, 'app', file)),
  openExternal: (url) => require('electron').shell.openExternal(url)
};

// Electron API
window.electronAPI = {
  readJSONFile: (callback) => {
    window.api.invoke('read-json-file').then((jsonData) => {
      callback(jsonData);
    });
  },
  updateJSONFile: (jsonData, callback) => {
    window.api.invoke('update-json-file', jsonData).then(() => {
      callback();
    });
  }
};
