type IResultAnswersKeys =
  | 'projectName'
  | 'overwrite'
  | 'overwriteChecker'
  | 'packageName'
  | 'tailwindCSS'
  | 'uiLibrary'
  | 'typescript'
  | 'changeName'
  | 'reactRouter'
  | 'reactQuery'
  | 'installDependencies';

interface IWriteDirs {
  templateDir: string;
  root: string;
}

type IMutateConfig =
  | 'tailwind'
  | 'typescript'
  | 'mui'
  | 'antd'
  | 'shadcn'
  | 'router'
  | 'reactQuery';

type JsConfig = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: {
      [alias: string]: string[];
    };
  };
  include?: string[];
  exclude?: string[];
};
