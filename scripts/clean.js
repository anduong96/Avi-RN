const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const removeFolder = (folderPath) => {
  if (fs.existsSync(folderPath)) {
    exec(`rm -rf ${folderPath}`, (err, stdout, stderr) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`Error removing ${folderPath}: ${err}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Removed ${folderPath}`);
      }
    });
  }
};

const removeFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    // eslint-disable-next-line no-console
    console.log(`Removed ${filePath}`);
  }
};

const projectPath = process.cwd();
const nodeModulesPath = path.join(projectPath, 'node_modules');
const podsPath = path.join(projectPath, 'ios', 'Pods');
const podfileLockPath = path.join(projectPath, 'ios', 'Podfile.lock');

removeFolder(nodeModulesPath);
removeFolder(podsPath);
removeFile(podfileLockPath);
