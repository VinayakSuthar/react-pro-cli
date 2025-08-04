type IResultAnswersKeys =
  | 'projectName'
  | 'overwrite'
  | 'overwriteChecker'
  | 'packageName'
  | 'tailwindCSS'
  | 'uiLibrary'
  | 'typescript'
  | 'changeName'
  | 'reactRouter';

interface IWriteDirs {
  templateDir: string;
  root: string;
}

type IMutateConfig = 'tailwind' | 'typescript' | 'mui' | 'shadcn' | 'router';

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
