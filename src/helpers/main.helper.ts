import fs from 'node:fs';
import path from 'node:path';
import spawn from 'cross-spawn';
import type { SpawnOptions } from 'node:child_process';

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  package_json: 'package.json'
};

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName
  );
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

const writeToFile = (file: string, dirs: IWriteDirs, content?: string) => {
  const { templateDir, root } = dirs;
  const targetPath = path.join(root, renameFiles[file] ?? file);
  if (content) {
    fs.writeFileSync(targetPath, content);
  } else {
    copy(path.join(templateDir, file), targetPath);
  }
};

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function executeCliCommand(
  command: string,
  args?: readonly string[],
  options?: SpawnOptions,
  isSync: boolean = false
) {
  if (isSync) {
    return spawn.sync(command, args, {
      stdio: 'inherit',
      ...options
    });
  }
  return spawn(command, args, {
    stdio: 'inherit',
    ...options
  });
}

function generateViteConfigAlias(aliases: Record<string, string>) {
  let aliasStr = '';

  for (const [key, value] of Object.entries(aliases)) {
    aliasStr += `  \v"${key}": path.resolve(__dirname, './${value}'),\n`;
  }

  return aliasStr;
}

function generateJsTsConfigAlias(aliases: Record<string, string>) {
  const aliasObj: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(aliases)) {
    aliasObj[`${key}/*`] = [`./${value}/*`];
  }

  return aliasObj;
}
const placeholderRegex = new RegExp(/~~(.*?)~~/g);

function updateConfigPlaceholders(
  content: string,
  placeholdersMap: Record<string, string>
) {
  let updatedContent = content;
  updatedContent = updatedContent.replace(placeholderRegex, (match) => {
    const key = match.replace(/~/g, '') as keyof typeof placeholdersMap;

    return placeholdersMap[key] ?? match;
  });
  return updatedContent;
}

function cleanUnusedPlaceholders(content: string) {
  return content.replace(placeholderRegex, '');
}

export {
  isValidPackageName,
  toValidPackageName,
  formatTargetDir,
  isEmpty,
  pkgFromUserAgent,
  emptyDir,
  copy,
  writeToFile,
  executeCliCommand,
  generateViteConfigAlias,
  generateJsTsConfigAlias,
  updateConfigPlaceholders,
  cleanUnusedPlaceholders
};
