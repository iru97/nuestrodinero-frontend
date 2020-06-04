const functions = require('firebase-functions');
const universal = require(`${process.cwd()}/dist/nuestrodinero-frontend/server/main.js`);

exports.ssr = functions.https.onRequest(universal.app());


