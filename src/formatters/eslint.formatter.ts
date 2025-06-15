const formatEsListAsStandard = (eslintProperties: any) => {
  const imports = [];
  const { plugins, ...properties } = { ...eslintProperties };
  const formattedPlugins = {};
  // plugins.foreach(p => {
  //   formattedPlugins
  // })

  return `export default[{${{ ...properties, ...plugins }}}]`;
};

export { formatEsListAsStandard };
