import fse from 'fs-extra';

(async () => {
  await fse.copy('package.json', 'dist/package.json');
  await fse.copy('README.md', 'dist/README.md');
  await fse.copy('LICENSE', 'dist/LICENSE');
})();
