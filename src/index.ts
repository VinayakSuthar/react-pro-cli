import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import minimist from 'minimist';
import prompts from 'prompts';

import { cyan, red, reset, yellow } from 'kolorist';
import {
  cleanUnusedPlaceholders,
  emptyDir,
  executeCliCommand,
  formatTargetDir,
  generateJsTsConfigAlias,
  generateViteConfigAlias,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
  updateConfigPlaceholders,
  writeToFile
} from './helpers/main.helper';

// Import the MAIN_CONFIG object which contains configuration for the project
import PACKAGE_CONFIG, {
  TAILWIND_CONFIG,
  MAIN_CONFIG,
  MUI_CONFIG,
  TS_CONFIG,
  DEPENDENCIES_VERSIONS,
  PACKAGE_SCRIPTS,
  ALIASES
} from './config';
import MAIN_FILE_CONTENT from './constants/mainTemplateContent';
import appContent from './constants/appComponent';
import VITE_CONFIG from './constants/viteConfig';
import eslintTSConfig from './constants/eslintTSconfig';
import eslintJSconfig from './constants/eslintJSconfig';
import mainCssContent from './constants/mainCss';

const mainConfigRegex = new RegExp(/~~(.*?)~~/g);

// Parse command-line arguments using minimist
const argv = minimist<{
  help?: boolean;
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: 'help' },
  string: ['_']
});

// Get the current working directory
const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Awesome React CLI - Scaffold Modern React Projects

Usage:
  rpc [options] [directory]

Options:
  -h, --help         Show this help message and exit

Description:
  A lightweight, modern CLI to scaffold React projects quickly and efficiently.
  By default, starts in interactive mode if no arguments are provided.

Features:
  - Quick setup for React projects with a single command
  - Customizable templates (includes a starter template)
  - Modern tooling: Vite, TypeScript, Tailwind CSS, MUI, ESLint, Prettier, and more
  - Cross-platform support (macOS, Linux, Windows)
  - Interactive prompts for project configuration

Examples:
  rpc my-app                # Scaffold a new React project in 'my-app' directory
  rpc                       # Start interactive mode
  rpc --help                # Show this help message

Project Links:
  GitHub: https://github.com/VinayakSuthar/react-pro-cli

For more details, see the README or run 'rpc --help'.
`;

// Define the default target directory for the new project
const defaultTargetDir = 'react-project';

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]) || '';
  const { help } = argv;
  if (help) {
    console.log(`${yellow(helpMessage)}`);
    return;
  }

  let targetDir = argTargetDir || defaultTargetDir;
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir;

  let result: prompts.Answers<IResultAnswers>;

  prompts.override({
    overwrite: argv.overwrite
  });
  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: cyan('Project name : '),
          initial: targetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || targetDir;
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select',
          name: 'overwrite',
          message: () =>
            cyan(
              (targetDir === '.'
                ? 'Current directory'
                : `Target directory "${targetDir}"`) +
                ` is not empty. Please choose how to proceed : `
            ),
          initial: 0,
          choices: [
            {
              title: yellow('Remove existing files and continue'),
              value: 'yes'
            },
            {
              title: yellow('Cancel operation'),
              value: 'no'
            },
            {
              title: yellow('Ignore files and continue'),
              value: 'ignore'
            }
          ]
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === 'no') {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: cyan('Package name : '),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: 'select',
          name: 'typescript',
          message: cyan('Do you want to have TypeScript ? '),
          initial: 0,
          choices: [
            {
              title: yellow('Yes'),
              value: true
            },
            {
              title: yellow('No'),
              value: false
            }
          ]
        },
        {
          type: 'select',
          name: 'uiLibrary',
          message: cyan('Please select an ui library of your choice : '),
          initial: 0,
          choices: [
            {
              title: yellow('None'),
              value: 'none'
            },
            {
              title: yellow('MUI'),
              value: 'mui'
            }
          ]
        },
        {
          type: 'select',
          name: 'tailwindCSS',
          message: cyan('Do you want to have Tailwind CSS ? '),
          initial: 0,
          choices: [
            {
              title: yellow('Yes'),
              value: true
            },
            {
              title: yellow('No'),
              value: false
            }
          ]
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const {
    overwrite,
    packageName,
    tailwindCSS: isTailwindSelected,
    typescript: isTypescriptSelected,
    uiLibrary
  } = result;

  // Get the absolute path of the target directory
  const root = path.join(cwd, targetDir);

  // Check if the target directory already exists and is not empty
  if (overwrite === 'yes') {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // Get information about the package manager being used
  const pkgInfo = pkgFromUserAgent(process.env.npm_MAIN_CONFIG_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';
  const filesToExclude = ['.eslintrc', 'package.json', 'vite.config.js'];
  let mainFileContent = MAIN_FILE_CONTENT;
  let mainCss = mainCssContent;

  console.log(`${reset(`\nScaffolding project in ${root}...\n`)}`);

  // Define the template directory based on whether TypeScript is enabled
  const template = isTypescriptSelected ? 'template-main' : 'template-main';

  // Get the absolute path of the template directory
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    './..',
    template
  );

  const { eslint, ...packageJsonDependencies } = PACKAGE_CONFIG.common;

  // Read the contents of .eslintrc and package.json files in the template directory
  let eslintConfig = eslintJSconfig;
  let packageJson = await fs.promises.readFile(
    `${templateDir}/package_json`,
    'utf8'
  );
  let viteConfig = VITE_CONFIG;

  const viteImports = [];
  const vitePlugins = [];
  let eslintRules = {};

  const packageJsonObj = {
    ...JSON.parse(packageJson),
    ...packageJsonDependencies,
    name: packageName || targetDir
  };

  const srcDir = `${root}/src`;

  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }

  try {
    const file = `${root}/src/App.${isTypescriptSelected ? 'tsx' : 'jsx'}`;
    fs.writeFileSync(file, appContent);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  // If Tailwind CSS is enabled, mutate the configs for ESLint and package.json
  if (isTailwindSelected) {
    mutateConfigs({ packageJson: packageJsonObj }, 'tailwind');
    viteImports.push("import tailwindcss from '@tailwindcss/vite'");
    vitePlugins.push('tailwindcss()');

    eslintRules = {
      ...eslintRules,
      ...PACKAGE_CONFIG.tailwind.eslint.rules
    };

    mainCss = TAILWIND_CONFIG.files['src/index.css'] + mainCss;
  }

  // If a UI library is selected, mutate the configs for ESLint and package.json
  if (uiLibrary !== 'none') {
    if (uiLibrary === 'mui') {
      mutateConfigs({ packageJson: packageJsonObj }, 'mui');
      const mainFilePHMap: Record<string, string> = {};
      MUI_CONFIG.muiImports.forEach((key) => {
        const value = MAIN_CONFIG[key as keyof typeof MAIN_CONFIG];
        if (value) {
          mainFilePHMap[key] = value;
        }
      });

      if (isTailwindSelected) {
        MUI_CONFIG.muiTailwindImports.forEach((key) => {
          const value = MAIN_CONFIG[key as keyof typeof MAIN_CONFIG];
          if (value) {
            mainFilePHMap[key] = value;
          }
        });
      }
      mainFileContent = updateConfigPlaceholders(
        mainFileContent,
        mainFilePHMap
      );
      writeToFile(
        `src/theme.ts`,
        { root, templateDir },
        `import { createTheme } from '@mui/material';\nconst theme = createTheme({});\nexport default theme;`
      );

      if (isTailwindSelected) {
        mainCss = MUI_CONFIG.indexCSS + mainCss;
      }
    }
  }

  // If TypeScript is enabled, mutate the configs for ESLint and package.json
  if (isTypescriptSelected) {
    mutateConfigs({ packageJson: packageJsonObj }, 'typescript');
    const indexHtmlPath = templateDir + '/index.html';
    const tsConfig = { ...TS_CONFIG.app };
    const tsConfigAliases = generateJsTsConfigAlias(ALIASES);
    tsConfig.compilerOptions.paths = {
      ...tsConfig.compilerOptions.paths,
      ...tsConfigAliases
    };
    eslintConfig = eslintTSConfig;

    let indexHtmlContent = await fs.promises.readFile(indexHtmlPath, 'utf8');
    indexHtmlContent = indexHtmlContent.replace('src/main.jsx', 'src/main.tsx');

    mainFileContent = mainFileContent.replace('~~main-ts-non-null~~', '!');

    fs.writeFileSync(`${root}/tsconfig.json`, JSON.stringify(TS_CONFIG.main));
    fs.writeFileSync(`${root}/tsconfig.app.json`, JSON.stringify(tsConfig));
    fs.writeFileSync(
      `${root}/tsconfig.node.json`,
      JSON.stringify(TS_CONFIG.node)
    );
    fs.writeFileSync(
      `${root}/src/vite-env.d.ts`,
      `/// <reference types="vite/client" />`
    );

    packageJsonObj.scripts.build = PACKAGE_SCRIPTS['typescript-build'];
    packageJsonObj.scripts.typecheck = PACKAGE_SCRIPTS.typecheck;

    fs.writeFileSync(`${root}/index.html`, indexHtmlContent);
    filesToExclude.push('index.html');
  } else {
    const jsConfig: JsConfig = {};
    const jsConfigAliases = generateJsTsConfigAlias(ALIASES);
    jsConfig.compilerOptions = {
      paths: { ...jsConfigAliases }
    };
    fs.writeFileSync(`${root}/jsconfig.json`, JSON.stringify(jsConfig));
  }

  // Get the latest versions of dependencies from npm registry
  await populateDependenciesWithStableVersion({ packageJson: packageJsonObj });

  mainFileContent = cleanUnusedPlaceholders(mainFileContent);

  try {
    const file = `${root}/src/main.${isTypescriptSelected ? 'tsx' : 'jsx'}`;
    fs.writeFileSync(file, mainFileContent);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  viteImports.push("import path from 'path'");
  const viteAliases = generateViteConfigAlias(ALIASES);
  const viteAliasStr = `resolve: {
      alias: {
        ${viteAliases}
      }
    }`;
  const viteConfigPlaceholderMap = {
    'vite-imports': viteImports.join('\n'),
    'vite-plugins': vitePlugins.join(', '),
    'vite-resolve-alias': viteAliasStr
  };
  viteConfig = updateConfigPlaceholders(viteConfig, viteConfigPlaceholderMap);

  const eslintConfigPlaceholderMap = {
    // removing curly braces from the JSON string to avoid those in config
    'eslint-rules': JSON.stringify(eslintRules, null, 2).replace(/[\{\}]/g, '')
  };

  eslintConfig = updateConfigPlaceholders(
    eslintConfig,
    eslintConfigPlaceholderMap
  );

  // Read the contents of all files in the template directory except .eslintrc and package.json
  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => !filesToExclude.includes(f))) {
    writeToFile(file, { templateDir, root });
  }

  // Define the files to be written and their contents
  const filesToWrite = [
    { filename: 'eslint.config.mjs', content: eslintConfig },
    {
      filename: 'package.json',
      content: JSON.stringify(packageJsonObj, null, 2)
    },
    { filename: 'vite.config.js', content: viteConfig }
  ];

  // Write the contents of the files to the target directory
  for (const file of filesToWrite) {
    writeToFile(file.filename, { templateDir, root }, file.content);
  }
  writeToFile('src/index.css', { root, templateDir }, mainCss);

  executeCliCommand(
    'npx',
    [
      '--yes',
      'prettier',
      '--log-level',
      'silent',
      '--config',
      `${root}/.prettierrc`,
      '--write',
      `${root}`
    ],
    { cwd: root }
  );
  executeCliCommand('git', ['init', '--quiet'], { cwd: root });

  process.on('exit', () => {
    console.log(
      `\n${cyan('Project setup complete!')}\n` +
        `\nNext steps:\n` +
        `  ${yellow(`cd ${targetDir}`)}\n` +
        `  ${yellow(`${pkgManager} install`)}\n` +
        `  ${yellow(`${pkgManager} run dev`)}\n`
    );
  });
}

// This function takes the eslintrc and packageJson objects and mutates them according to the type of feature being added
async function mutateConfigs({ packageJson }: any, type: IMutateConfig) {
  const { eslint, ...packageJsonDependencies } = PACKAGE_CONFIG[type];

  // add the dependencies and eslint configurations from the MAIN_CONFIG object to the respective objects
  Object.entries(packageJsonDependencies).map(([key, value]) => {
    packageJson[key] = [...new Set([...packageJson[key], ...value])];
  });
}

type TDependencyKeys = keyof typeof DEPENDENCIES_VERSIONS.dependencies;
type TDevDependencyKeys = keyof typeof DEPENDENCIES_VERSIONS.devDependencies;

// this function takes the packageJson object from the mutateConfigs and adds the latest version of each dependency to it
async function populateDependenciesWithStableVersion({ packageJson }: any) {
  const deps = [...packageJson.dependencies] as TDependencyKeys[];
  const devDeps = [...packageJson.devDependencies] as TDevDependencyKeys[];

  packageJson.dependencies = {};
  packageJson.devDependencies = {};

  for (const dep of deps) {
    packageJson.dependencies[dep] =
      `${DEPENDENCIES_VERSIONS.dependencies[dep]}`;
  }
  for (const dep of devDeps) {
    packageJson.devDependencies[dep] =
      `${DEPENDENCIES_VERSIONS.devDependencies[dep]}`;
  }
}

init().catch((e) => {
  console.error(e);
});
