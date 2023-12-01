const https = require('https');

/**
 * Fetches data from the specified URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<{ json: () => Promise<any>, text: () => Promise<string>, status: number, headers: any }>} A promise that resolves with a response object.
 */
function fetch(url, options) {
  return new Promise((resolve, reject) => {
    https
      .get(url, options, (response) => {
        const { statusCode, headers } = response;
        let rawData = '';

        response.on('data', (chunk) => {
          console.log(`Data: ${chunk}`);
          rawData += chunk;
        });

        response.on('end', () => {
          const body = JSON.parse(rawData);
          resolve({
            status: statusCode,
            headers: headers,
            json: () => Promise.resolve(body),
            text: () => Promise.resolve(rawData),
          });
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

module.exports = fetch;
