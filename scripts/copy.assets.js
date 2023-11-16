const fs = require('fs');
const path = require('path');
/**
 * @type {string}
 */
let source = null;
/**
 * @type {string}
 */
let destination = null;

const args = process.argv.slice(2);
const argMap = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key] = value;
  return acc;
}, {});

source = argMap['--source'];
destination = argMap['--destination'];

if (!source) {
  console.error('Source path not provided.');
  process.exit(1);
} else if (!destination) {
  console.error('Destination path not provided.');
  process.exit(1);
}

/**
 * Copies a file from the source path to the destination path.
 *
 * @param {string} source - The path of the file to be copied.
 * @param {string} destination - The path where the file should be copied to.
 */
const copyFile = (source, destination) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
  }

  fs.copyFileSync(source, destination);
  console.log(`Copied ${source} to ${destination}`);
};

/**
 * Recursively copies a folder from the source directory to the destination directory.
 *
 * @param {string} sourceDir - The path of the source directory.
 * @param {string} destDir - The path of the destination directory.
 */
const copyFolder = (sourceDir, destDir) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);

    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
};

console.log(`Copying ${source} to ${destination}`);
const isDirectory = fs.lstatSync(source).isDirectory();

if (isDirectory) {
  copyFolder(source, destination);
} else {
  copyFile(source, destination);
}
