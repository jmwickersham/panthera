const writeFile = require('fs').writeFile;
const argv = require('yargs').argv;

require('dotenv').config();

const environment = argv.env;
const isProd = environment === 'prod';

const targetPath = `./client/src/environments/environment.${environment}.ts`;
const envConfigFile = `
export const environment = {
  production: ${isProd},
  serverUrl: "${process.env.SERVERURL}",
  twitch: {
    clientID: "${process.env.TWITCH_CLIENT_ID}"
  }
};
`
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
