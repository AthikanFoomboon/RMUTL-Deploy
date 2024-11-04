const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // ใช้เส้นทางแบบ absolute เพื่อโหลดไฟล์ index.html จากโฟลเดอร์ build
  mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

  // เปิด DevTools สำหรับการ debug (ตัวเลือก)
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
