const fs = require('fs-extra');

(async () => {
  const src = '../dist/nuestrodinero-frontend';
  const dest = './dist/nuestrodinero-frontend';

  await fs.remove(dest);
  await fs.copy(src, dest);
})();
