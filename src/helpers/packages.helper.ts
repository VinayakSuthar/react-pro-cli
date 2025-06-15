async function getPackageLatestVersion(packageName: string) {
  return fetch('https://registry.npmjs.org/' + packageName + '/latest')
    .then((res) => res.json())
    .then((res: any) => {
      return res.version;
    });
}

export { getPackageLatestVersion };
