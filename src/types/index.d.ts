type IResultAnswers =
  | 'projectName'
  | 'overwrite'
  | 'packageName'
  | 'tailwindCSS'
  | 'uiLibrary'
  | 'typescript'
  | 'changeName'
  | 'overwriteChecker';
interface IWriteDirs {
  templateDir: string;
  root: string;
}

type IMutateConfig = 'tailwind' | 'typescript' | 'mui';

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
