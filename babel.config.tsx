import type { ConfigFunction } from '@babel/core';

const babelConfig: ConfigFunction = (api) => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  return {
    presets,
  };
};

export default babelConfig;
