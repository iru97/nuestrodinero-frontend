const fs = require('fs');

(async () => {
  const src = '../dist/nuestrodinero-frontend';
  const dest = './dist/nuestrodinero-frontend';

  await fs.unlink(dest);
  await fs.copyFile(src, dest);

})();
