import * as vite from 'vite';
const env = vite.loadEnv('production', process.cwd());
console.log(JSON.stringify(env.VITE_BASE_URL));
