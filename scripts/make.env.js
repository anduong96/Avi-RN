const fs = require('fs');
const { ENV } = require('../src/env');

// eslint-disable-next-line no-console
console.log('Making env');

try {
  const content = Object.keys(ENV)
    .map((key) => `${key}=${process.env[key]}`)
    .join('\n');

  fs.writeFileSync('.env', content, {
    encoding: 'utf-8',
  });

  // eslint-disable-next-line no-console
  console.log('Made env keys', Object.keys(ENV));
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}
