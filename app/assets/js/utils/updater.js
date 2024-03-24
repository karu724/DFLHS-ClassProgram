const { ipcRenderer } = require('electron');
const restartButton = document.getElementById('install-update');
const updatescreen = document.getElementById('update');
ipcRenderer.on('update-available', () => {
  console.log('업데이트가 존재합니다')
  updatescreen.style.display = 'flex';
  restartButton.style.display = "none"
  localStorage.setItem("patchnote", "true");
});
ipcRenderer.on('update-downloaded', () => {
  console.log('다운로드 완료')
  restartButton.style.display = ""
});
restartButton.addEventListener('click', () => {
  ipcRenderer.send('restartApp');
});

ipcRenderer.on('update-not-available', () => {
  updatescreen.style.display = "none"
  console.log('update is not available')
});
