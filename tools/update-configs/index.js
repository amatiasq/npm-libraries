const {
  readFileSync,
  readdirSync,
  writeFileSync,
  copyFileSync,
} = require('fs');
const { join } = require('path');

const basePkg = json(getTemplateFilename('package.json'));
const packagesDir = join(__dirname, '../../packages/');
const packages = readdirSync(packagesDir);
const files = [
  '.npmignore',
  'jest.config.js',
  'tsconfig.es5.json',
  'tsconfig.es2018.json',
];

for (const entry of packages) {
  const dir = join(packagesDir, entry);
  const pkgPath = join(dir, 'package.json');
  const pkg = json(pkgPath);

  for (const file of files) {
    copyFileSync(getTemplateFilename(file), join(dir, file));
  }

  write(pkgPath, {
    ...pkg,
    ...basePkg,
    name: `@amatiasq/${entry}`,
    scripts: {
      ...(pkg.scripts || {}),
      ...(basePkg.scripts || {}),
    },
  });
}

function getTemplateFilename(name) {
  return __filename.replace(/index\.js$/, name);
}

function json(path) {
  return JSON.parse(readFileSync(path));
}

function write(path, json) {
  writeFileSync(path, JSON.stringify(json, null, 2));
}
