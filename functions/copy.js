const fs = require('fs');
const rimraf = require('rimraf');
var path = require("path");
const src = '../dist/nuestrodinero-frontend';
const dest = './dist/nuestrodinero-frontend';

// Check dist
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

rimraf.sync(dest);
copyFolderSync(src, dest);

function copyFolderSync(from, to) {
  fs.mkdirSync(to);
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}
