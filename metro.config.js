'use strict';

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  ...defaultConfig,
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    ...defaultConfig.resolver,
    extraNodeModules: {
      ...defaultConfig.resolver.extraNodeModules,
      '@/assets': `${__dirname}/src/assets`,
      '@/components': `${__dirname}/src/components`,
      '@/context': `${__dirname}/src/context`,
      '@/hooks': `${__dirname}/src/hooks`,
      '@/navigation': `${__dirname}/src/navigation`,
      '@/screens': `${__dirname}/src/screens`,
      '@/service': `${__dirname}/src/service`,
      '@/styles': `${__dirname}/src/styles`,
      '@/types': `${__dirname}/src/types`,
      '@/utils': `${__dirname}/src/utils`,
    },
    sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx', 'js', 'jsx'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
