const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
let newBundleId = null;
let manifestPath = path.resolve(
  __dirname,
  '../android/app/src/main/AndroidManifest.xml',
);

const argMap = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key] = value;
  return acc;
}, {});

newBundleId = argMap['--bundle_id'];
manifestPath = argMap['--manifestPath'] || manifestPath;

if (!newBundleId) {
  console.error('New bundle ID not provided.');
  process.exit(1);
}
/* -------------------------------------------------------------------------- */
/*                         Update AndroidManifest.xml                         */
/* -------------------------------------------------------------------------- */
const manifestData = fs.readFileSync(manifestPath, 'utf-8');
const packagePattern = /package="[^"]+"/;
const updatedPackage = `package="${newBundleId}"`;
const updatedManifest = manifestData.replace(packagePattern, updatedPackage);
fs.writeFileSync(manifestPath, updatedManifest, 'utf-8');
console.log('Updated AndroidManifest.xml');
