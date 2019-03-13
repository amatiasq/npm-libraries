const { readFileSync, readdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const basePkg = loadConf("package.json");
const baseTsConfig = loadConf("tsconfig.json");
const packagesDir = join(__dirname, "../packages/");
const packages = readdirSync(packagesDir);

for (const entry of packages) {
  const dir = join(packagesDir, entry);
  const pkgPath = join(dir, "package.json");
  const pkg = json(pkgPath);

  write(join(dir, "tsconfig.json"), baseTsConfig);
  write(pkgPath, {
    ...pkg,
    ...basePkg,
    name: `@amatiasq/${entry}`,
    scripts: {
      ...(pkg.scripts || {}),
      ...(basePkg.scripts || {})
    }
  });
}

function loadConf(name) {
  return json(__filename.replace(/js$/, name));
}

function json(path) {
  return JSON.parse(readFileSync(path));
}

function write(path, json) {
  writeFileSync(path, JSON.stringify(json, null, 2));
}
