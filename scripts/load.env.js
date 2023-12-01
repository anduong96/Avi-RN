const dotenv = require('dotenv');
const fetch = require('./fetch');

dotenv.config();

/**
 * @type {string}
 */
const DOPPLER_TOKEN = process.env.DOPPLER_TOKEN;
/**
 * @type {'production' | 'staging' | 'development' | 'test'
 */
const NODE_ENV = process.env.NODE_ENV;
const DOPPLER_ENV = NODE_ENV === 'test' ? 'development' : NODE_ENV;
const PROJECT_NAME = 'avi-rn';
const params = new URLSearchParams({
  project: PROJECT_NAME,
  config: DOPPLER_ENV,
  include_dynamic_secrets: 'true',
  include_managed_secrets: 'true',
});

if (!DOPPLER_TOKEN) {
  throw new Error('Missing DOPPLER_TOKEN');
}

const route = `https://api.doppler.com/v3/configs/config/secrets?${params}`;
const Authorization = `Bearer ${DOPPLER_TOKEN}`;
console.log('Loading secrets from Doppler');

fetch(route, {
  method: 'GET',
  accept: 'application/json',
  accepts: 'application/json',
  headers: {
    Authorization,
  },
})
  .then((r) => r.json())
  .then((data) => {
    /**
     * @type {Record<string, { raw: any, computed: any }>}
     */
    const secrets = data.secrets;
    for (const [key, value] of Object.entries(secrets)) {
      console.log(key + '=' + value.computed);
      process.env[key] = value.computed;
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
